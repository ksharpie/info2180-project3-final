/* clean database */

DROP DATABASE IF EXISTS cheapomail;
CREATE DATABASE cheapomail;
USE cheapomail;

/* user table */

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`firstname` varchar(20) NOT NULL,
	`lastname` varchar(20) NOT NULL,
	`username` varchar(16) NOT NULL,
	`password` varchar(32) NOT NULL,
	UNIQUE (`username`)
);

/* create admin account (id=1 represents admin) with username 'admin' and password 'admin' */
INSERT INTO `user` (`firstname`, `lastname`, `username`, `password`) values ('Master', 'User', 'admin', '78a41fb9315f6e22a9983e141f58534d');

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`recipient_ids` text NOT NULL,
	`user_id` int(11) NOT NULL,
	`subject` varchar(128) NOT NULL,
	`body` mediumtext NOT NULL,
	`date_sent` datetime NOT NULL
);

DROP TABLE IF EXISTS `message_read`;
CREATE TABLE `message_read` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`message_id` int(11) NOT NULL,
	`reader_id` int(11) NOT NULL,
	`date` datetime NOT NULL
);