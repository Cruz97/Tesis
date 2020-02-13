import { v4 as uuid } from 'uuid';

export class AppSyncModel {
  static client = null;
  static records = [];
  static deltas = [];
  static observers = [];

  constructor(props = {}) {
    Object.assign(this, props);
  }

  static initDelta() {
    this.records = [];
    this.observers = [];
    AppSyncModel.client
      .watchQuery({
        query: gql(queries[`list${this.prototype.modelName}s`]),
        fetchPolicy: 'cache-and-network',
        pollInterval: 1000,
        variables: {
          index: 'dbType-index',
          query: AppSyncModel.queryBuilder([
            'dbType',
            '=',
            this.prototype.modelName
          ])
        }
      })
      .subscribe({
        next: ({ data }) => {},
        error: error => {}
      });
  }

  static subscribe(observer) {
    this.observers.push(observer);
    observer(this.records);
  }

  static setDelta() {

  }

  static create(input) {
    const mutationInput = {};
    mutationInput[
      this.prototype.partitionKey
    ] = this.prototype.modelName.toUpperCase();
    mutationInput[this.prototype.sortKey] = uuid();
    return new Promise((resolve, reject) => {
      AppSyncModel.client
        .mutate(
          buildMutation(
            this.client,
            gql(mutations[`create${this.prototype.modelName}`]),
            {
              inputType: gql(this.prototype.inputType),
              variables: {
                input: {
                  dbType: this.prototype.modelName,
                  ...mutationInput,
                  ...input
                }
              }
            },
            _variables => [gql(queries[`list${this.prototype.modelName}s`])],
            this.prototype.modelName,
            this.prototype.partitionKey
          )
        )
        .then(({ data }) => {
          const record = data[`create${this.prototype.modelName}`];
          resolve(record);
        })
        .catch(err => reject(err));
    });
  }

  update(values) {
    const input = { ...values };
    delete input.__typename;
    input[this.partitionKey] = this[this.partitionKey];
    input[this.sortKey] = this[this.sortKey];
    return new Promise((resolve, reject) => {
      AppSyncModel.client
        .mutate({
          mutation: gql(mutations[`update${this.modelName}`]),
          variables: {
            input
          }
        })
        .then(({ data }) => {
          const record = data[`update${this.modelName}`];
          Object.assign(this, record);
          resolve(record);
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    const input = {};
    input[this.partitionKey] = this[this.partitionKey];
    input[this.sortKey] = this[this.sortKey];
    return AppSyncModel.client.mutate({
      mutation: gql(mutations[`delete${this.modelName}`]),
      variables: {
        input
      }
    });
  }

  static search(filter = []) {
    const query = `list${this.prototype.modelName}s`;
    let queryExpression = [];
    if (filter.length > 0) {
      queryExpression = [
        'AND',
        ['dbType', '=', this.prototype.modelName],
        filter
      ];
    } else {
      queryExpression = ['dbType', '=', this.prototype.modelName];
    }

    const variables = {
      index: 'dbType-index',
      query: AppSyncModel.queryBuilder(queryExpression)
    };

    return new Promise((resolve, reject) => {
      AppSyncModel.client
        .query({
          query: gql(queries[query]),
          variables
        })
        .then(({ data }) => {
          resolve(data[query] ? data[query].items : []);
        })
        .catch(error => reject(error));
    });
  }

  static get(partitionKey, sortKey = this.prototype.modelName.toUpperCase()) {
    const query = `list${this.prototype.modelName}s`;
    const queryExpression = [
      'AND',
      [this.prototype.partitionKey, '=', partitionKey],
      [this.prototype.sortKey, '=', sortKey]
    ];
    const variables = {
      query: AppSyncModel.queryBuilder(queryExpression)
    };

    return new Promise((resolve, reject) => {
      AppSyncModel.client
        .query({
          query: gql(queries[query]),
          variables
        })
        .then(({ data }) => {
          resolve(data[query] ? data[query].items[0] : null);
        })
        .catch(error => reject(error));
    });
  }

  static searchKey(filter = []) {
    const query = `list${this.prototype.modelName}s`;
    const variables = {
      query: AppSyncModel.queryBuilder(filter)
    };

    return new Promise((resolve, reject) => {
      AppSyncModel.client
        .query({
          query: gql(queries[query]),
          variables
        })
        .then(({ data }) => {
          resolve(data[query] ? data[query].items : []);
        })
        .catch(error => reject(error));
    });
  }

  static queryBuilder(query = []) {
    const expressionValues = {};
    const exprValue = (key, value) => {
      let type = 'S';
      switch (typeof value) {
        case 'number':
        case 'bigint':
          type = 'N';
          break;
        case 'boolean':
          type = 'B';
          break;
        default:
          type = 'S';
      }
      expressionValues[key] = {};
      expressionValues[key][type] = value;
    };
    const convert = arr => {
      if (
        typeof arr[0] === 'string' &&
        arr[1] instanceof Array &&
        arr.length > 2 &&
        arr[2] instanceof Array
      ) {
        return (
          ' (' + convert(arr[1]) + ' ' + arr[0] + ' ' + convert(arr[2]) + ') '
        );
      } else {
        let expr = '';
        if (arr[1] === 'BEGIN') {
          const field = arr[0].slice(0, 1).toUpperCase() + arr[0].slice(1);
          const key = `:begin${field}`;
          exprValue(key, arr[2]);
          expr = ` begins_with(${arr[0]}, ${key}) `;
        } else if (arr[0] === 'EXIST') {
          expr = ` attribute_exists(${arr[1]}) `;
        } else if (arr[0] === 'UNEXIST') {
          expr = ` attribute_not_exists(${arr[1]}) `;
        } else if (arr[1] === 'BETWEEN' || arr[1] === 'IN') {
          const field = arr[0].slice(0, 1).toUpperCase() + arr[0].slice(1);
          let values = '';
          let key = `:${arr[1] === 'IN' ? 'in' : 'between'}${field}`;
          arr[2].forEach((item, index) => {
            const indexKey = key + index.toString();
            exprValue(indexKey, item);
            values +=
              index === 0
                ? indexKey
                : (arr[1] === 'IN' ? ',' : ' AND ') + indexKey;
          });
          if (arr[1] === 'IN') {
            values = `(${values})`;
          }
          expr = `${arr[0]} ${arr[1]} ${values}`;
        } else {
          const key = `:${arr[0]}`;
          exprValue(key, arr[2]);
          expr = `${arr[0]} ${arr[1]} ${key}`;
        }

        return expr;
      }
    };
    let expression = convert(query);
    return JSON.stringify({ expression, expressionValues });
  }
}

AppSyncModel.prototype.partitionKey = 'uid';
AppSyncModel.prototype.sortKey = 'sUid';
