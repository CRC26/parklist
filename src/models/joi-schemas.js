import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("mickey@mouse.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Mickey").required(),
  lastName: Joi.string().example("Mouse").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ParkSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Poppintree Park"),
    location: Joi.string().allow("").optional().example("dcc"),
    rating: Joi.string().min(0).max(2).pattern(/^[0-9]+$/).optional().example("2"),
    parklistid: IdSpec,
  })
  .label("Park");

export const ParkSpecPlus = ParkSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ParkPlus");

export const ParkArraySpec = Joi.array().items(ParkSpecPlus).label("ParkArray");

export const ParklistSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("dcc parks"),
    userid: IdSpec,
    parks: ParkArraySpec,
  })
  .label("Parklist");

export const ParklistSpecPlus = ParklistSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("ParklistPlus");

export const ParklistArraySpec = Joi.array().items(ParklistSpecPlus).label("ParklistArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");
