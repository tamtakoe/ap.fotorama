-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 30 2013 г., 07:00
-- Версия сервера: 5.5.32-log
-- Версия PHP: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `fotorama`
--

CREATE TABLE IF NOT EXISTS `fotorama` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `pos` int(10) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `full` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `thumb` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `html` text COLLATE utf8_unicode_ci NOT NULL,
  `caption` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=66 ;

--
-- Дамп данных таблицы `fotorama`
--

INSERT INTO `fotorama` (`id`, `pos`, `active`, `full`, `img`, `thumb`, `html`, `caption`, `size`) VALUES
(49, 0, 0, '5247f56cae2b1.jpeg', '5247f56cae2b1.jpeg', '5247f56cae2b1.png', '', 'asfas', 26761),
(50, 1, 0, '5247f56e0dc96.jpeg', '5247f56e0dc96.jpeg', '5247f56e0dc96.png', '', 'aaa', 24665),
(51, 2, 0, '5247f56f541df.jpeg', '5247f56f541df.jpeg', '5247f56f541df.png', '', '12434', 7104);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
