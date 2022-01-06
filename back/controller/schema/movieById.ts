import Joi from "joi";
const SearchMoviesByIdSchema = Joi.object({
  id: Joi.string().required()
});

export { SearchMoviesByIdSchema };
