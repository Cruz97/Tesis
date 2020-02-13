import { AppSyncModel } from '../AppSync';
import AppSyncConfig from '../../../aws-exports';
import Decoder from 'base64-to-uint8array';

export default class Attachment extends AppSyncModel {
  static create(input) {
    let inputStorage = { ...input };
    // inputStorage['file']['bucket'] = AppSyncConfig.aws_user_files_s3_bucket;
    // inputStorage['file']['region'] = AppSyncConfig.aws_user_files_s3_bucket_region;
    inputStorage.file.bucket = 'salesforce-sf';
    inputStorage.file.region = 'us-west-2';
    inputStorage.file.localUri = Decoder(input.file.localUri);
    return super.create(inputStorage);
  }
}

Attachment.prototype.idField = 'id';
Attachment.prototype.modelName = 'Attachment';
Attachment.prototype.inputType = `
type Attachment {
  id: ID!
  res_id: ID
  res_model: String
  file: S3Object
}`;
