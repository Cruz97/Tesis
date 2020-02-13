export const arrayEquals = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] instanceof Array && b[i] instanceof Array) {
      if (!arrayEquals(a[i], b[i])) {
        return false;
      }
    } else if (a[i] instanceof Object && b[i] instanceof Object) {
      if (!objectEquals(a[i], b[i])) {
        return false;
      }
    } else if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
};

export const objectEquals = (a, b) => {
  for (let propName in a) {
    if (a.hasOwnProperty(propName) !== b.hasOwnProperty(propName)) {
      return false;
    } else if (typeof a[propName] !== typeof b[propName]) {
      return false;
    }
  }

  for (let propName in b) {
    if (a.hasOwnProperty(propName) !== b.hasOwnProperty(propName)) {
      return false;
    } else if (typeof a[propName] !== typeof b[propName]) {
      return false;
    }

    if (!a.hasOwnProperty(propName)) {
      continue;
    }

    if (a[propName] instanceof Array && b[propName] instanceof Array) {
      if (!arrayEquals(a[propName], b[propName])) {
        return false;
      }
    } else if (a[propName] instanceof Object && b[propName] instanceof Object) {
      if (!objectEquals(a[propName], b[propName])) {
        return false;
      }
    } else if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
};
