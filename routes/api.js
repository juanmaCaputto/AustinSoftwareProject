const express = require('express');
const router = express.Router();
const Business = require('../models/business');
const Publisher = require('../models/publisher');
const Ad = require('../models/ad');

                    //REQUESTS FOR BUSINESSES

//Creating a new business
router.post('/businesses', function(req, res, next){
    
    Business.create(req.body).then(function(business){
        res.send(business);
    }).catch(next);

});

//Delete an old business
router.delete('/businesses/:id', function(req, res, next){
    
    Business.findByIdAndRemove({_id: req.params.id}).then(function(business){
        res.send(business);
    }).catch(next);

});

//Updating an old business    
router.put('/businesses/:id', function(req, res, next){
   
    Business.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Business.findOne({_id: req.params.id}).then(function(business){
            res.send(business);
        });
    }).catch(next);

}); 

//Reaching for an specific business
router.get('/businesses/:id', function(req,res, next){
    
    Business.find({_id: req.params.id}).then(function(business){
        res.send(business);
    }).catch(next);

});

                        //REQUESTS FOR PUBLISHERS

//Create new publisher
router.post('/publishers', function(req, res, next){
   
    Publisher.create(req.body).then(function(publisher){
        res.send(publisher);
    }).catch(next);

});

//Delete old publisher
router.delete('/publishers/:id', function(req, res, next){
    
    Publisher.findByIdAndRemove({_id: req.params.id}).then(function(publisher){
        res.send(publisher);
    }).catch(next);

});

//Update certain publisher
router.put('/publishers/:id', function(req, res, next){
    
    Publisher.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
        Publisher.findOne({_id: req.params.id}).then(function(publisher){
            res.send(publisher);
        });

    }).catch(next);
}); 

//Retreiving certain publisher
router.get('/publishers/:id', function(req,res, next){
    
    Publisher.find({_id: req.params.id}).then(function(publisher){
        res.send(publisher);
    }).catch(next);

});

                    //REQUESTS FOR ADS

//Create new ad
router.post('/ads', function(req, res, next){
    
    var ad = new Ad(req.body);
    
    if((ad.businessId) !== undefined && (ad.publisherId) !== undefined){
        ad.state = "Pre-Associated"
    }

    Ad.create(ad).then(function(ad1){
        res.send(ad1);
    }).catch(next);

});

//Delete old ad
router.delete('/ads/:id', function(req, res, next){
    
    Ad.findByIdAndRemove({_id: req.params.id}).then(function(ad){
        res.send(ad);
    }).catch(next);

});

//Update certain ad
router.put('/ads/:id', function(req, res, next){
      
    Ad.findOneAndUpdate({_id: req.params.id}, req.body).then(function(){

        Ad.findOne({_id: req.params.id}).then(function(ad){

            if(ad.state !== "Cancelled"){
                if((ad.state) == "Requested" && (ad.businessId) !== undefined && (ad.publisherId) !== undefined){
                
                    ad.state = "Pre-Associated"
        
                }else if((ad.state) == "Associated"){
                    
                    if((ad.businessId) !== undefined && (ad.publisherId) !== undefined && 
                        (ad.title) !== undefined && (ad.description) !== undefined &&
                        (ad.startDate) !== undefined && (ad.endDate) !== undefined){
                
                            ad.state = "Completed"

                    }else if((ad.businessId) !== undefined && (ad.publisherId) !== undefined && 
                        (ad.title) !== undefined && (ad.description) !== undefined){
            
                        ad.state = "ContentReady"
            
                    }
                
                }else if((ad.state) == "ContentReady"){           
                    if((ad.businessId) !== undefined && (ad.publisherId) !== undefined && 
                        (ad.title) !== undefined && (ad.description) !== undefined &&
                        (ad.startDate) !== undefined && (ad.endDate) !== undefined){
                
                            ad.state = "Completed"

                    }
                }
                Ad.findOneAndUpdate({_id: req.params.id}, ad).then(function(){
                    Ad.findOne({_id: req.params.id}).then(function(ad){
                        res.send(ad);
                    });
                })
            }else{
                Ad.findOne({_id: req.params.id}).then(function(ad){
                    res.send(ad);
                });
            } 
        });
    }).catch(next);   
}); 

//Retreiving certain ad
router.get('/ads/:id', function(req, res, next){

    Ad.find({_id: req.params.id}).then(function(ad){
        res.send(ad);
    }).catch(next);

});

//Verify certain ad
router.put('/ads/:id/verify', function(req, res, next){
    
    Ad.findOne({_id: req.params.id}).then(function(ad){

        if(ad.state !== "Cancelled"){
            if((ad.businessId) == undefined || (ad.publisherId) == undefined){

                ad.state = "Requested";

            }else if((ad.businessId) !== undefined && (ad.publisherId) !== undefined && 
                    (ad.title) !== undefined && (ad.description) !== undefined &&
                    (ad.startDate) !== undefined && (ad.endDate) !== undefined){
            
                ad.state = "Completed";

            }else if((ad.businessId) !== undefined && (ad.publisherId) !== undefined && 
                    (ad.title) !== undefined && (ad.description) !== undefined){

                ad.state = "ContentReady";

            }else if((ad.businessId) !== undefined && (ad.publisherId) !== undefined){

                ad.state = "Associated";
            }
            Ad.findOneAndUpdate({_id: req.params.id}, ad).then(function(){
                Ad.findOne({_id: req.params.id}).then(function(ad){
                    res.send(ad);
                });
            })
        }else{
            Ad.findOne({_id: req.params.id}).then(function(ad){
                res.send(ad);
            });
        } 

    }).catch(next);

    

}); 

router.put('/ads/:id/cancelled', function(req, res, next){

    Ad.findOne({_id: req.params.id}).then(function(ad){
        
        if((ad.state) !== "Completed"){    
            ad.state = "Cancelled";
            Ad.findByIdAndUpdate({_id: req.params.id}, ad).then(function(){            
                Ad.findOne({_id: req.params.id}).then(function(ad){
                    res.send(ad);
                });
            })
        }else{
            Ad.findOne({_id: req.params.id}).then(function(ad){
                res.send(ad);
            });
        }
    }).catch(next);

});

module.exports = router;