# User Resolver test

## User resolver Queries
- getAllUsers : return tous les Users avec leur informations
- getAllUsersById : return un utilisateur à partir de son id (valid)
- getAllUsersById : return un utilisateur à partir de son id (invalid)

## Signup Mutation
- User entre des informations correctes : signup = succes
- User entre des informations incorrectes (email sans @) : signup = fail
- User entre des informations incorrectes (mot de passe incorrect) : signup = fail
- User entre des informations incorrectes (email déjà utilisé) : signup = fail

## Login Mutation
- User s'authentifie : info correct = success
- User s'authentifie : info incorrectes (email) = fail
- User s'authentifie : info incorrectes (password) = fail

## Logout Mutation
- User se déconnecte de sa session = success
- User se déconnecte avec un contexte invalide (setHeader throws) = fail

## UpdateUserEveryDetail Mutation
- ADMIN_SITE change des roles = success
- ADMIN_CITY change des roles = success
- Poi creator change des roles = fail
- User (simple) change des roles = fail
- Le user change ses informations (mauvais Id) = fail

## UpdateUserRole Mutation
- ADMIN_SITE is changing user role = success
- ADMIN_CITY is changing user role = success
- POI_CREATOR is changing user role = fail
- USER (lambda) is changing user role = fail
- user role with incorrect id = fail

## UpdateUserData Mutation
- ADMIN_SITE change les informations du user = success
- ADMIN_CITY change les informations du user = fail
- POI_CREATOR change les informations du user = fail
- USER (pas bon id) change les informations du user = fail
- USER (bon id) change les informations du user = success

## DeleteUser Mutation
- ADMIN_SITE, supprime un utilisateur
- ADMIN_SITE, supprime un utilisateur
