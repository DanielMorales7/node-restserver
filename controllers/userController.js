import { response } from "express";

const get_users = (req, res) => {

    const {nombre, r ='no param'} = req.query;

    res.status(200).json({
        "msg":"Controller- API",
        nombre,
        r
    });
}

const put_users = (req, res) => {

    const {id} = req.params;

    res.status(200).json({
        "msg":req.body,
        id
    });
}

const post_users = (req, res) => {

    const body = req.body;

    res.status(200).json({
        "msg":"Post Api",
        body
    });
}

const delete_users = (req, res) => {
    res.status(200).json({
        "msg":"get API"
    });
}

const patch_users = (req, res) => {
    res.status(200).json({
        "msg":"get API"
    });
}

export {
    get_users,
    put_users,
    post_users,
    delete_users,
    patch_users
}