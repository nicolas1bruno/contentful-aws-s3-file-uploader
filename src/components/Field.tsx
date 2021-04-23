import React, { useState, useEffect } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';

const { CognitoIdentityClient } = require("@aws-sdk/client-cognito-identity");
const { fromCognitoIdentityPool } = require("@aws-sdk/credential-provider-cognito-identity");
const { S3Client, PutObjectCommand, ListObjectsCommand } = require("@aws-sdk/client-s3");

// Set the AWS Region
const REGION = process.env.REACT_APP_AWS_REGION;

// Initialize the Amazon Cognito credentials provider
const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL_ID, // IDENTITY_POOL_ID
  }),
});

const albumName = "contentful";
const albumBucketName = process.env.REACT_APP_AWS_BUCKET; //BUCKET_NAME

// Add a photo to an album
const addPhoto = async (file: any) => {
    console.log('file= ' + file);
    //const files = document.getElementById("photoupload").files;
    try {
      const albumPhotosKey = encodeURIComponent(albumName) + "/";
      const data = await s3.send(
          new ListObjectsCommand({
            Prefix: albumPhotosKey,
            Bucket: albumBucketName
          })
      );
      const fileName = file.name;
      const photoKey = albumPhotosKey + fileName;
      const uploadParams = {
        Bucket: albumBucketName,
        Key: photoKey,
        Body: file
      };
      try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        console.log('date = ' + JSON.stringify(data));
        console.log("Successfully uploaded photo.");
      } catch (err) {
        return console.log("There was an error uploading your photo: ", err.message);
      }
    } catch (err) {
      if (!file) {
        return console.log("Choose a file to upload first.");
      } else {
        return console.log("Error: ", err.message);
      }
    }
};

interface FieldProps {
  sdk: FieldExtensionSDK
}

const Field = (props: FieldProps) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(props.sdk.field.getValue() || '');

  props.sdk.field.onValueChanged((value) => {
    if( value != imageSrc ){
      setImageSrc( value)
    }
  })

  useEffect(() => {
    props.sdk.window.startAutoResizer();
  })

  const handleFileInput = (e: any) => {
    let file = e.target.files[0];
    setSelectedFile( file );
    
    addPhoto( selectedFile );
    buildFieldValue( file.name );
  }

  const buildFieldValue = ( fileName: String) => {
    let url = "https://" + albumBucketName + ".s3-" + REGION + ".amazonaws.com/" + albumName + "/" + fileName;
    props.sdk.field.setValue( url );
  }
  
  return <div>
    <img src={imageSrc} />
    <input name="file" type="file" accept="image/png, image/jpeg" onChange={handleFileInput}></input>
  </div>
};

export default Field;
