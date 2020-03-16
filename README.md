# moving-background-icon

With the aid of this library you can add moving elements on your websites. The element follows a random path, rotates accordingly and has the option for particles or path that follows it behind.

## Installation

To install it just download the js library and import it with a script tag in your html file. In the future if there is any interest CDN can be added.

~~~ html
<script src="path/movingBackgroundIcon.js" async defer></script>
~~~

## Usage

To use the library just put any element in your html with the "backgroundIcon" classname. You can put as many elements as you want but adding more than 10 might make it laggy: 

~~~ html
<img src = 'anyKindOfImage.extension' class = "backgroundIcon">
<div class = "backgroundIcon">
~~~

To remove the particles add "noParticles" class name as follows: 

~~~ html
<img src = 'anyKindOfImage.extension' class = "backgroundIcon noParticles">
<div class = "backgroundIcon noParticles">
~~~

Every element can have different moving speed which can be changed by adding custom "speed" attribute to the element: 

~~~ html
<img src = 'anyKindOfImage.extension' class = "backgroundIcon noParticles" speed = "10">
<div class = "backgroundIcon noParticles" speed = "5">
~~~~

Recomended speed is anything between 1-10, if ommited default speed is 3.

## Author 

Written by Atanas Kolev 

## License

No license, anyone can use and change the library as you wish
