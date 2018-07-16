DROP TABLE cfg_task;
DROP TABLE cfg_col;

CREATE TABLE IF NOT EXISTS `cfg_task` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `order` varchar(128) NOT NULL,
  `createdAt` datetime NOT NULL COMMENT '创建时间',
  `updatedAt` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*-- type: 0:自增id  1: input 2:select 3:textarea 4:图片 5:url 6:label 7:checkbox 8:datepicker  9:隐藏 --*/
CREATE TABLE IF NOT EXISTS `cfg_col` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `taskid` int(11) unsigned NOT NULL,
  `order` tinyint default 0 NOT NULL,
  `name` varchar(128) NOT NULL,
  `title` varchar(128) NOT NULL,
  `type` tinyint default 1 NOT NULL,
  `cfg` text NOT NULL,
  `createdAt` datetime NOT NULL COMMENT '创建时间',
  `updatedAt` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;


/*-- 任务配置 --*/
insert into cfg_task values(1,'cfg_task','任务配置表','id', now(),now());
insert into cfg_col values(1,1,1,'id','自动',0,'',now(),now());
insert into cfg_col values(3,1,2,'order','排序方式',1,'',now(),now());
insert into cfg_col values(4,1,3,'name','表名',1,'',now(),now());
insert into cfg_col values(5,1,4,'title','描述',1,'',now(),now());
insert into cfg_col values(6,1,5,'','操作',1,'{"dangerouslySetInnerHTML":{"__html":"<a href=\\"#/list/2?taskid={{id}}\\">配置</a>"}}',now(),now());

/*-- 任务属性配置 --*/
insert into cfg_task values(2,'cfg_col','任务属性配置表','id', now(),now());
insert into cfg_col values(7,2,1,'id','自动',0,'',now(),now());
insert into cfg_col values(8,2,2,'taskid','选择任务',1,'',now(),now());
insert into cfg_col values(9,2,3,'order','排序方式',1,'',now(),now());
insert into cfg_col values(10,2,4,'name','字段名称',1,'',now(),now());
insert into cfg_col values(11,2,5,'title','字段描述',1,'',now(),now());
insert into cfg_col values(12,2,6,'type','类别',2,'[[ 0,"自增id "],[1,"input"],[2,"select"],[3,"textarea"],[4,"图片"],[ 5,"url"],[ 6,"label"],[7,"checkbox"],[ 8,"datepicker"],[9,"隐藏"],[10,"自定义"]]',now(),now());
insert into cfg_col values(13,2,7,'cfg','配置项',3,'',now(),now());