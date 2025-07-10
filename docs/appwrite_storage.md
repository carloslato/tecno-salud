

The Storage service allows you to manage your project files. Using the Storage service, you can upload, view, download, and query all your project files.

Files are managed using buckets. Storage buckets are similar to Collections we have in our Databases service. The difference is, buckets also provide more power to decide what kinds of files, what sizes you want to allow in that bucket, whether or not to encrypt the files, scan with antivirus and more.

Using Appwrite permissions architecture, you can assign read or write access to each bucket or file in your project for either a specific user, team, user role, or even grant it with public access (any). You can learn more about how Appwrite handles permissions and access control.

The preview endpoint allows you to generate preview images for your files. Using the preview endpoint, you can also manipulate the resulting image so that it will fit perfectly inside your app in terms of dimensions, file size, and style. The preview endpoint also allows you to change the resulting image file format for better compression or image quality for better delivery over the network.

https://<REGION>.cloud.appwrite.io/v1

 

Create a new file. Before using this route, you should create a new bucket resource using either a server integration API or directly from your Appwrite console.

Larger files should be uploaded using multiple requests with the content-range header to send a partial request with a maximum supported chunk of 5MB. The content-range header values should always be in bytes.

When the first request is sent, the server will return the File object, and the subsequent part request must include the file's id in x-appwrite-id header to allow the server to know that the partial upload is for the existing file and not for a new one.

If you're creating a new file using one of the Appwrite SDKs, all the chunking logic will be managed by the SDK internally.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /storage/buckets/{bucketId}/files

 

import { Client, Storage } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.createFile(

    '<BUCKET_ID>', // bucketId

    '<FILE_ID>', // fileId

    document.getElementById('uploader').files[0], // file

    ["read("any")"] // permissions (optional)

);

console.log(result);

Get a file by its unique ID. This endpoint response returns a JSON object with the file metadata.

    Request

    Response

 

GET /storage/buckets/{bucketId}/files/{fileId}

 

import { Client, Storage } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.getFile(

    '<BUCKET_ID>', // bucketId

    '<FILE_ID>' // fileId

);

console.log(result);

Get a file content by its unique ID. The endpoint response return with a 'Content-Disposition: attachment' header that tells the browser to start downloading the file to user downloads directory.

    Request

    Response

 

GET /storage/buckets/{bucketId}/files/{fileId}/download

 

import { Client, Storage } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = storage.getFileDownload(

    '<BUCKET_ID>', // bucketId

    '<FILE_ID>', // fileId

    '<TOKEN>' // token (optional)

);

console.log(result);

    Request

    Response

 

GET /storage/buckets/{bucketId}/files/{fileId}/view

 

import { Client, Storage } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = storage.getFileView(

    '<BUCKET_ID>', // bucketId

    '<FILE_ID>', // fileId

    '<TOKEN>' // token (optional)

);

console.log(result);

Get a file preview image. Currently, this method supports preview for image files (jpg, png, and gif), other supported formats, like pdf, docs, slides, and spreadsheets, will return the file icon image. You can also pass query string arguments for cutting and resizing your preview image. Preview is supported only for image files smaller than 10MB.

    Request

    Response

 

GET /storage/buckets/{bucketId}/files/{fileId}/preview

 

import { Client, Storage, ImageGravity, ImageFormat } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = storage.getFilePreview(

    '<BUCKET_ID>', // bucketId

    '<FILE_ID>', // fileId

    0, // width (optional)

    0, // height (optional)

    ImageGravity.Center, // gravity (optional)

    -1, // quality (optional)

    0, // borderWidth (optional)

    '', // borderColor (optional)

    0, // borderRadius (optional)

    0, // opacity (optional)

    -360, // rotation (optional)

    '', // background (optional)

    ImageFormat.Jpg, // output (optional)

    '<TOKEN>' // token (optional)

);

console.log(result);

Get a list of all the user files. You can use the query params to filter your results.

    Request

    Response

 

GET /storage/buckets/{bucketId}/files

 

import { Client, Storage } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.listFiles(

    '<BUCKET_ID>', // bucketId

    [], // queries (optional)

    '<SEARCH>' // search (optional)

);

console.log(result);

Update a file by its unique ID. Only users with write permissions have access to update this resource.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /storage/buckets/{bucketId}/files/{fileId}

 

import { Client, Storage } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.updateFile(

    '<BUCKET_ID>', // bucketId

    '<FILE_ID>', // fileId

    '<NAME>', // name (optional)

    ["read("any")"] // permissions (optional)

);

console.log(result);

Delete a file by its unique ID. Only users with write permissions have access to delete this resource.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

DELETE /storage/buckets/{bucketId}/files/{fileId}

 

import { Client, Storage } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const storage = new Storage(client);

const result = await storage.deleteFile(

    '<BUCKET_ID>', // bucketId

    '<FILE_ID>' // fileId

);

console.log(result);

