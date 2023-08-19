const crypto = require('crypto');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const Image = require('../model/imageModel');

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    },
    region: process.env.AWS_REGION
})


exports.getAllImage = async (req, res) => {
    const response = await Image.find();
    if(!response){
        return res.status(404).json({ message:"No data present" });
    }

    for (const data of response) {
        const getObjectParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: data.imageName,
        }

        const command = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        data.imageUrl = url;
    }
    res.json(response);
}

exports.createImage = async (req, res) => {
    if (!req.file || !req.body.title || !req.body.description) {
        return res.json({ message: "Bad request" });
    }
    
    const imageName = randomImageName();
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

    const command = new PutObjectCommand(params);
    await s3.send(command);
    const imageDB = new Image({
        title: req.body.title,
        description: req.body.description,
        imageName: imageName
    });
    imageDB.save().then(
        result => res.status(201).json({ message: 'success' })
    ).catch(err => res.json({ error: err }));
}

exports.deleteImage = async (req, res) => {
    const image = await Image.findOne({ _id: req.params.id });
    if (!image) {
        res.status(404).json({ message: "data not found" })
    }


    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.imageName
    }
    const command = new DeleteObjectCommand(params)
    await s3.send(command);
    await Image.findByIdAndRemove({ _id: req.params.id });

    res.status(200).json({ message: 'deleted successfully' });
}