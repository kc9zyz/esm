var gradDate = new Date('August 5, 2016');
var now = new Date();
var timeDiff = now.getTime() - gradDate.getTime();
var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
document.getElementById('graduation-date').innerHTML= 'The team graduated '+diffDays + ' days ago';
