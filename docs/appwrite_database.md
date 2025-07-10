

The Databases service allows you to create structured collections of documents, query and filter lists of documents, and manage an advanced set of read and write access permissions.

All data returned by the Databases service are represented as structured JSON documents.

The Databases service can contain multiple databases, each database can contain multiple collections. A collection is a group of similarly structured documents. The accepted structure of documents is defined by collection attributes. The collection attributes help you ensure all your user-submitted data is validated and stored according to the collection structure.

Using Appwrite permissions architecture, you can assign read or write access to each collection or document in your project for either a specific user, team, user role, or even grant it with public access (any). You can learn more about how Appwrite handles permissions and access control.

https://<REGION>.cloud.appwrite.io/v1

 

Create a new Document. Before using this route, you should create a new collection resource using either a server integration API or directly from your database console.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

POST /databases/{databaseId}/collections/{collectionId}/documents

 

import { Client, Databases } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setSession('') // The user session to authenticate with

    .setKey('') // 

    .setJWT('<YOUR_JWT>'); // Your secret JSON Web Token

const databases = new Databases(client);

const result = await databases.createDocument(

    '<DATABASE_ID>', // databaseId

    '<COLLECTION_ID>', // collectionId

    '<DOCUMENT_ID>', // documentId

    {}, // data

    ["read("any")"] // permissions (optional)

);

console.log(result);

Get a document by its unique ID. This endpoint response returns a JSON object with the document data.

    Request

    Response

 

GET /databases/{databaseId}/collections/{collectionId}/documents/{documentId}

 

import { Client, Databases } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.getDocument(

    '<DATABASE_ID>', // databaseId

    '<COLLECTION_ID>', // collectionId

    '<DOCUMENT_ID>', // documentId

    [] // queries (optional)

);

console.log(result);

Get a list of all the user's documents in a given collection. You can use the query params to filter your results.

    Request

    Response

 

GET /databases/{databaseId}/collections/{collectionId}/documents

 

import { Client, Databases } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.listDocuments(

    '<DATABASE_ID>', // databaseId

    '<COLLECTION_ID>', // collectionId

    [] // queries (optional)

);

console.log(result);

Update a document by its unique ID. Using the patch method you can pass only specific fields that will get updated.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PATCH /databases/{databaseId}/collections/{collectionId}/documents/{documentId}

 

import { Client, Databases } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.updateDocument(

    '<DATABASE_ID>', // databaseId

    '<COLLECTION_ID>', // collectionId

    '<DOCUMENT_ID>', // documentId

    {}, // data (optional)

    ["read("any")"] // permissions (optional)

);

console.log(result);

Delete a document by its unique ID.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

DELETE /databases/{databaseId}/collections/{collectionId}/documents/{documentId}

 

import { Client, Databases } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.deleteDocument(

    '<DATABASE_ID>', // databaseId

    '<COLLECTION_ID>', // collectionId

    '<DOCUMENT_ID>' // documentId

);

console.log(result);

WARNING: Experimental Feature - This endpoint is experimental and not yet officially supported. It may be subject to breaking changes or removal in future versions.

Create or update a Document. Before using this route, you should create a new collection resource using either a server integration API or directly from your database console.

    Request

    Response
     
    Rate limits

     	

     	

      	 	

 

PUT /databases/{databaseId}/collections/{collectionId}/documents/{documentId}

 

import { Client, Databases } from "appwrite";

const client = new Client()

    .setEndpoint('https://<REGION>.cloud.appwrite.io/v1') // Your API Endpoint

    .setProject('<YOUR_PROJECT_ID>'); // Your project ID

const databases = new Databases(client);

const result = await databases.upsertDocument(

    '<DATABASE_ID>', // databaseId

    '<COLLECTION_ID>', // collectionId

    '<DOCUMENT_ID>', // documentId

    {}, // data

    ["read("any")"] // permissions (optional)

);

console.log(result);

