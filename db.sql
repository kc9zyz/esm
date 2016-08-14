DROP DATABASE IF EXISTS `esm`;
CREATE database esm;
USE esm;
DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `lat` float DEFAULT NULL,
  `lon` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
DROP TABLE IF EXISTS `esm`;
CREATE TABLE `esm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `panelOutput` float(5,1) DEFAULT '0.0',
  `shingleOutput` float(5,1) DEFAULT '0.0',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `location` smallint(5) unsigned DEFAULT NULL,
  `heading` smallint(5) unsigned DEFAULT '0',
  `panelAngle` tinyint(4) DEFAULT '0',
  `boxTemp` smallint(6) DEFAULT '0',
  `windSpeed` smallint(6) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `location` (`location`),
  CONSTRAINT `esm_ibfk_1` FOREIGN KEY (`location`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22969 DEFAULT CHARSET=latin1;
