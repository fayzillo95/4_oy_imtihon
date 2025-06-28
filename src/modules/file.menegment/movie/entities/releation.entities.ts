// import {
//     ForeignKey,
//     BelongsTo,
//     HasOne,
//     HasMany,
//     BelongsToMany
// } from "sequelize-typescript"
// import { Movies } from "./movies.entity";
// import { MovieFile } from "./movie_file.entity";
// import { MovieCategory } from "./category.entity";
// import { MovieCategories } from "./movie.categories";

// export const initReleations = async () => {
//   Movies.hasMany(MovieFile, { foreignKey: 'id' });
//   MovieFile.belongsTo(Movies, { foreignKey: 'id' });

//   Movies.belongsTo(MovieCategory, {
//     foreignKey: 'id',
//   });

//   MovieCategory.belongsTo(Movies, {
//     foreignKey: 'id',
//   });
//   MovieCategories.belongsTo(Movies,{foreignKey : "id"})
//   MovieCategories.belongsTo(MovieCategory, {foreignKey : "id"})
// };