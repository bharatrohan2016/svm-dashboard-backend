const FarmerSchema = require('../models/farmer');

const create = async (entry) =>{
    const instance = new FarmerSchema(entry);
    entry = await instance.save();
    return entry;
}

const findAll = async (query={}) =>{
    let entries = await  FarmerSchema.find(query);
    return entries;
}

const findById = async(_id) => {
    const entry = await FarmerSchema.findOne({_id});
    return entry;
}

const update = async(_id, data) => {
    const entry = await FarmerSchema.updateOne({_id}, data );
    return entry;
}

const delete_ = async(_id) => {
    const entry = await FarmerSchema.deleteOne({_id});
    return entry;
}

module.exports = {create, findAll, findById, update, delete_};