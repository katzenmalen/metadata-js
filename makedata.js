const fs = require('fs'); 
const csv = require('csv-parser');

inputFilePath = 'metadata.csv';

// CHANGE THESE VALUES
inputName = 'LOOKS RARE';
inputFee = 10;
inputCollectionName = "LOOKS RARE PASS";
inputCollectionFamily = "LOOKS RARE";
inputDescription = "LOOKS RARE - IS RARE. PRIORITY MINT PASS";
inputFileType = "image/gif";
inputFileExtension = "gif"
inputSymbol = "RARE"
inputAddress = "EFqfsF7pSVnt1oYeApGCRLFuShWStZxxYCwTfFis1A9Y"

// maybe change the template

template = {
  "name": inputName,
  "image": "0.jpg",
  "description": "",
  "seller_fee_basis_points": inputFee,
  "symbol": inputSymbol,
  "collection": {
      "name": inputCollectionName,
      "family": inputCollectionFamily
  },
  "attributes": [
    {
      "trait_type": "looksrare",
      "value": "yes"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "0.jpg",
        "type": inputFileType
      }
    ]
  },
  "creators": [
      {
        "address": inputAddress,
        "share": 100
      }
    ]
}


fs.createReadStream(inputFilePath)
.pipe(csv())
.on('data', function(data){
    try {
        var meta = template;
        meta.name = inputName + " #" + data.Nr;
        meta.image = data.Nr + "." + inputFileExtension;
        meta.description = inputDescription;
        meta.properties = {
          files : [
            {
              "uri": meta.image,
              "type": inputFileType
            }
          ]
        };

        // check here for setting the right attributes from the source csv, if you need them.
        // otherwise, you can define it also as empty like this:
        //meta.attributes = [];

        // we are currently adding two attributes from the csv
        meta.attributes = [
          {
            "trait_type": "Size",
            "value": data.size
          },
          {
            "trait_type": "Level",
            "value": data.level
          }
        ];

       
        console.log(JSON.stringify(meta, null, 2));
        let dataOut = JSON.stringify(meta, null, 2);
        fs.writeFileSync(data.Nr + '.json', dataOut);

        //perform the operation
    }
    catch(err) {
        //error handler
    }
})
.on('end',function(){
    //some final operation
});  