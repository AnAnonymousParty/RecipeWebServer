call InstallDependencies.bat

call ejsLint .\Views\editRecipe.ejs
call ejsLint .\Views\error.ejs
call ejsLint .\Views\getRecipe.ejs
call ejsLint .\Views\index.ejs
call ejsLint .\Views\newRecipe.ejs
call ejsLint .\Views\printRecipe.ejs
call ejsLint .\Views\viewRecipe.ejs

set DEBUG=recipeserver:* & npm start