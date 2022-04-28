# rest-api-test-weblex  
  
  ## Уважаемые друзья, может быть, и будующие коллеги ! Вам представлен проект rest-api.  
  В проекте реализованы: авторизация, регистрация, также добавление, удаление, и изменение rest данных, с созданием собственной локальной реляционной БД(что конечно является в разы труднее, чем использование готовой БД), о причине такого перехода указано в заключении.  
  Для реализации данного проекта были использованы в основном две библиотеки: Express, Handlebars.  
    
      
   ### Rest- пути  
   get '/auth/login' - вход в страницу авторизации.    
   post '/auth/login' - авторизация  
   get '/auth/logout' - для выхода из сессии  
     
     
   get '/auth/register' - вход в страницу регистрации  
   post '/auth/register' - регистрация пользователя  
     
   get '/'- главная страница  
   post '/addPost' - добавляет сообщение
   get '/editPost:id' - вход в страницу для изменения сообщений  
   post '/editPost:id' - изменяет сообщение  
   post '/delPost:id' - удаляет сообщение
   
   
   
     
       
   ### Содержимое папок:  
   #### data - содержит файлы: comments.json, users.json, которые являются псевдо-БД, где хранятся пользователи и сообщения.
   #### middleware - промежуточные обработчики для Express.  
   #### public - статичные файлы приложения.  
   #### routes - файлы api. 
   #### services - содержит сервис предоставляющий методы взаимодействия БД, такие как: getCommentById, getCommentByIdAnDelete, getCommentByIdAndUpdate, addUser и т.д  
   #### utils - содержит файл с вспомогательной функцией для Handlebars.
   #### views - содержит файлы фронтенд части, которые динамически загружают данные с БД .  
   
   
   ### index.js - файл в котором все приложение собрано
   
 ## Заключение 
    К большому сожалению немного пришлось отклониться от заданного Т/З, в связи с ограничением БД MongoDb для граждан РФ. (После определенных санкций сайт MongoDb стал недоступным (пробовал и c vpn) не помогло.)
    В данном проекте в намерениях было использовать и typescript - но срок дедлайна и определенные пробелы в typescript, которые вспылись при попытке использования, перенаправили мое намерение.  
    По моему субъективному мнению, если сравнить сложность Т/З с выполненным мною проектом, думаю, что сложность моего проекта выше (так как много чего написано вручную, без библиотек).  
    Если дальнейшее мое трудоустройство связано с изучением и развитием еще других навыков или технологий, то я готовь и к этому
    
    
   
   

   
   
