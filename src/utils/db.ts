import mongoose from "mongoose";
import schema from "../models";

interface db_function {
    [key: string]: any;
    collection: string;
    query?: any;
    options?: any;
    project?: any;
    limit?: number;
    skip?: number;
    populate?: any;
    sort?: any;
    time?: any;
    value?: any;
    id?: any;
    update?: any;
}
interface PaginateOptions {
  page: number;
  limit: number;
}

interface Schema {
    [key: string]: mongoose.Model<any, any>;
}

let ObjectId = mongoose.Types.ObjectId;
async function find({
    collection,
    query,
    project,
    limit,
    skip,
    populate,
    sort,
}: db_function) {
    const result = await (schema as Schema)[collection]
        .find(query, project)
        .limit(limit)
        .sort(sort)
        .skip(skip)
        .populate(populate)
        .lean();
    return result;
}

async function findOne({
    collection,
    query,
    project,
    populate,
    sort,
}: db_function) {
    const result = await (schema as Schema)[collection]
        .findOne(query, project)
        .sort(sort)
        .populate(populate)
        .lean();
    return result;
}
async function insertOne({ collection, document, options }: db_function) {
    const result = await (schema as Schema)[collection].create(document);
    return result;
}

async function insertMany({ collection, documents }: db_function) {
    const result = await (schema as Schema)[collection].insertMany(documents);
    return result;
}

async function updateOne({ collection, query, update, options }: db_function) {
    const result = await (schema as Schema)[collection].updateOne(
        query,
        update,
        options
    );
    return result;
}

async function updateMany({ collection, query, update, options }: db_function) {
    const result = await (schema as Schema)[collection].updateMany(
        query,
        update,
        options
    );
    return result;
}

async function deleteOne({ collection, query }: db_function) {
    const result = await (schema as Schema)[collection].deleteOne(query);
    return result;
}

async function deleteMany({ collection, query }: db_function) {
    const result = await (schema as Schema)[collection].deleteMany(query);
    return result;
}

async function distinct({ collection, field, query }: db_function) {
    const result = await (schema as Schema)[collection].distinct(field, query);
    return result;
}

async function aggregate({ collection, pipeline }: db_function) {
    const result = await (schema as Schema)[collection].aggregate(pipeline);
    return result;
}

async function aggregateWithPaginate({
    collection,
    pipeline,
    options,
}: {
    collection: string;
    pipeline: any[];
    options: PaginateOptions;
}) {
    const { page = 1, limit = 10 } = options;

    const skip = (page - 1) * limit;


    const paginatedPipeline = [...pipeline, { $skip: skip }, { $limit: limit }];

    const result = await (schema as Schema)[collection].aggregate(
        paginatedPipeline
    );

    const countPipeline = [...pipeline, { $count: "count" }];
    const countResult = await (schema as Schema)[collection].aggregate(
        countPipeline
    );
    const total = countResult.length ? countResult[0].count : 0;

    const pages = Math.ceil(total / limit);

    return {
        docs: result,
        total,
        limit,
        page,
        pages,
    };
}

async function countDocuments({ collection, query }: db_function) {
    const result = await (schema as Schema)[collection].countDocuments(query);
    return result;
}

async function findByIdAndUpdate({
    collection,
    id,
    update,
    options,
}: db_function) {
    const result = await (schema as Schema)[collection].findByIdAndUpdate(
        { _id: new ObjectId(id) },
        update,
        options
    );
    return result;
}

async function save({ document }: db_function) {
    const result = await document.save();
    return result;
}

async function findByIdAndDelete({ collection, id }: db_function) {
    const result = await (schema as Schema)[collection].deleteOne({
        _id: new ObjectId(id),
    });
    return result;
}

async function findOneAndUpdate({ collection, query, update }: db_function) {
    const result = await (schema as Schema)[collection].findOneAndUpdate(
        query,
        update
    );
    return result;
}

async function exists({ collection, query }: db_function) {
    const result = await (schema as Schema)[collection].exists(query);
    return result;
}

export {
    find,
    findByIdAndDelete,
    //   createDocument,
    findByIdAndUpdate,
    findOne,
    findOneAndUpdate,
    insertMany,
    insertOne,
    save,
    deleteMany,
    deleteOne,
    countDocuments,
    aggregate,
    distinct,
    updateMany,
    updateOne,
    exists,
    ObjectId,
    aggregateWithPaginate
};