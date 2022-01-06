import Joi from "joi";
const SearchMoviesSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  year: Joi.number().max(new Date().getFullYear()),
  type: Joi.string().valid("movie", "series", "episode"),
  page: Joi.number().default(1)
});

export { SearchMoviesSchema };
