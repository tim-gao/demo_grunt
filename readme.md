This project is for homework.

Start page is “main.html”, you can open it by your browser.(Chrome, IE9+..).

Project based on requirejs ,bootstrap and Jquery, using grunt to run relevant task.

(Please make sure you have installed NodeJS,Git,Ruby,compass,Grunt.)

Please follow below step to run the project:

step1. go to the project folder in commond line

step2. npm install (install all required modules )

Step3. grunt default
	Expected logs:

	Running "clean:0" (clean) task
	>> 1 path cleaned.

	Running "clean:1" (clean) task
	>> 0 paths cleaned.

	Running "jshint:files" (jshint) task
	>> 4 files lint free.

	Running "qunit:files" (qunit) task
	Testing test/Qunit.html ......OK
	>> 6 tests completed with 0 failed, 0 skipped, and 0 todo.
	>> 26 assertions (in 49ms), passed: 26, failed: 0

	Running "concat:dist" (concat) task

	Running "uglify:dist" (uglify) task

	Running "compass:dev" (compass) task

	Done, without errors.

step4. When grunt tasks finished, just refresh the browser to check main.html


Note: if you hit the error like "Phantomjs not found", please try to 

	1. npm uinstall phantomjs
	2. npm install phantomjs -g
 Suppose above commands could fix the issue.

 Thanks.