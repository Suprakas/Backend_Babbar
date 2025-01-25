const fs = require('fs');
const path = require('path');
const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

// Local file upload -> Handler Function
exports.localFileUpload = async (req, res) => {
    try {
        // Verify file is present in request
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        // Fetch file
        const file = req.files.file;
        console.log("File contents: ", file);

        // Ensure "files" directory exists
        const dir = path.join(__dirname, '../files');
        console.log("Directory path -> ", dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log("Created directory -> ", dir);
        }

        // Define storage path
        let filepath = path.join(dir, Date.now() + '_' + file.name);
        console.log("File path -> ", filepath);

        // Move file
        file.mv(filepath, (err) => {
            if (err) {
                console.error("Error moving file:", err);
                return res.status(500).json({
                    success: false,
                    message: "Error uploading file",
                    error: err
                });
            }
            console.log('File moved to: ', filepath);
            
            // Send success response
            res.json({
                success: true,
                message: "File uploaded successfully"
            });
        });

    } catch (error) {
        console.error("Unable to upload file on server:", error);
        res.status(500).json({
            success: false,
            message: "Server error during file upload",
            error: error.message
        });
    }
};

function isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("Temp file path ->", file.tempFilePath);
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// Image file handler define

exports.imageUpload = async (req, res) => {
    try {
        // data fetch
        const {name, email, tags} = req.body;
        console.log(name, email, tags);
 
        const file = req.files.imageFile;
        console.log(file);

        // data validation
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type  : ", fileType);
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: "false",
                message: "File format is not supported"
            })
        }

        // file format supported
        console.log("Uploaded to cloudinary");
        const response = await uploadFileToCloudinary(file, "MediaFiles");
        console.log(response);

        //Entry Saving in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image uploaded Successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })

    }
}

// Video Upload handler

exports.videoUpload = async (req, res) => {
    try {
        // data fetch
        const {name, email, tags} = req.body;
        console.log(name, email, tags);
        
        const file = req.files.videoFile;

           // data validation
           const supportedTypes = ["mp4", "mov"];
           const fileType = file.name.split('.')[1].toLowerCase();
           console.log("File Type  : ", fileType);
           if(!isFileTypeSupported(fileType, supportedTypes)){
               return res.status(400).json({
                   success: "false",
                   message: "File format is not supported"
               })
           }
           
        // file format supported
        console.log("Uploaded to cloudinary");
        const response = await uploadFileToCloudinary(file, "MediaFiles");
        console.log(response);
           
        //Entry Saving in DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Video uploaded Successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        })
    }
}

//Image size reducer

exports.imageSizeReducer = async (req, res) => {
    try{
     // data fetch
     const {name, email, tags} = req.body;
     console.log(name, email, tags);

     const file = req.files.imageFile;
     console.log(file);

     // data validation
     const supportedTypes = ["jpeg", "jpg", "png"];
     const fileType = file.name.split('.')[1].toLowerCase();
     console.log("File Type  : ", fileType);
     if(!isFileTypeSupported(fileType, supportedTypes)){
         return res.status(400).json({
             success: "false",
             message: "File format is not supported"
         })
     }

     // file format supported
     console.log("Uploaded to cloudinary");
     const response = await uploadFileToCloudinary(file, "MediaFiles", 90);
     console.log(response);

     //Entry Saving in DB
     const fileData = await File.create({
         name,
         tags,
         email,
         imageUrl: response.secure_url,
     });

     res.json({
         success: true,
         imageUrl: response.secure_url,
         message: "Image uploaded Successfully"
     })

 } catch (error) {
     console.error(error);
     res.status(400).json({
         success: false,
         message: "Something went wrong"
     })

 }
}

