const Lead = require('../../models/lead/lead.js');

const add = async function (req, res, next) {
  // console.log('lead req.body',req.body);

  const leadData = JSON.parse(req.body.data);

  let attachments = '';

  req.files.map((file) => {
    attachments = attachments === '' ? file.filename : (attachments + ',' + file.filename);
  });

  const leadParam = {
    lead_id: leadData.lead_id,
    franchise_id: leadData.franchise_id,
    message: leadData.message,
    is_active: leadData.is_active,
    user_id: req.decoded.user_id,
    userid: req.decoded.id,
    upload: attachments,
    is_franchise_exist:leadData.is_franchise_exist,
    franchise_name:leadData.franchise_name,
    f_id:req.decoded.franchise_id,
    uid:req.decoded.id,
    customer_name: leadData.customer_name,
    customer_contact: leadData.customer_contact,
    customer_id : leadData.customer_id, 
  };
  try {
    const newLead = new Lead(leadParam);
    await newLead.add();
    const leadList = await new Lead({ user_id: req.decoded.user_id, franchise_id: req.decoded.franchise_id  }).all();
    
    res.send({ leadList });
  } catch (err) {
    next(err);
  }
};

const all = async function (req, res, next) {
  // console.log('req.decoded',req.decoded);
  try {
    const leadList = await new Lead({ user_id: req.decoded.user_id, franchise_id: req.decoded.franchise_id }).all();
    res.send({ leadList });
  } catch (err) {
    next(err);
  }
};
const last = async function (req, res, next) {
  try {
    const leadLast = await new Lead({ user_id: req.decoded.user_id }).last();
    res.send( leadLast );
  } catch (err) {
    next(err);
  }
};

const addComment = async function (req, res, next) {
  const leadParam = {
    lead_id: req.body.lead_id,
    comment:req.body.comment,
    comment_by: req.body.comment_by
  };
  try {
    const newLead = new Lead(leadParam);
    await newLead.addComment();
    const leadList = await new Lead({ user_id: req.decoded.user_id, franchise_id: req.decoded.franchise_id  }).all();
    
    res.send({ leadList });
  } catch (err) {
    next(err);
  }
};

const allComment = async function (req, res, next) {
  const leadParam = {
    lead_id: req.body.lead_id
  };
  try {
    const newLead = new Lead(leadParam);
    const commentList = await newLead.allComment();
    
    res.send({ commentList });
  } catch (err) {
    next(err);
  }
};

const franchiseList = async function (req, res, next) {
  try {
    const franchiseList = await new Lead({ user_id: req.decoded.user_id }).franchiseList();
    
    res.send({ franchiseList });
  } catch (err) {
    next(err);
  }
};

const convertedList = async function (req, res, next) {
  try {
    const convertedList = await new Lead({ user_id: req.decoded.user_id }).convertedList();
    
    res.send({ convertedList });
  } catch (err) {
    next(err);
  }
};
const filter = async function (req, res, next) {
  const leadParam = {
    filter_id: req.body.filter_id,
    user_id: req.decoded.user_id,
  };
  try {
    const newLead = new Lead(leadParam);

    if(req.body.filter_id!=4){
      const leadList = await newLead.filter();
      
      res.send({ leadList });
    }
    else{
      const leadList = await new Lead({ user_id: req.decoded.user_id,  franchise_id: req.decoded.franchise_id  }).all();
      
      res.send({ leadList });
    }
  } catch (err) {
    next(err);
  }
};

const search = async function (req, res, next) {
  // console.log('lead rq..',req.body);
  let leadParams = {
    user_id: req.decoded.user_id,
    searchText: req.body.searchText,
  };
	try{
    const newLead = new Lead(leadParams);
    const result = await newLead.searchData();

    res.send({ leadList: result });
	}catch(err){
    next(error);
	}
};



const fetchLeads = async function (req, res, next) {
  console.log('lead rq..',req.body);
  let leadParams = {
    user_id: req.decoded.user_id,
    franchise_id: req.decoded.franchise_id,
  };
	try{
    const newLead = new Lead(leadParams);
    const result = await newLead.fetchLeads();

    res.send({ leadList: result });
	}catch(err){
    next(error);
	}
};


module.exports = { add, all, last, addComment, allComment, franchiseList, convertedList, filter, search, fetchLeads};