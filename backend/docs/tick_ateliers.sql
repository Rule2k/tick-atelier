-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Ven 01 Février 2019 à 16:24
-- Version du serveur :  5.7.20-0ubuntu0.16.04.1
-- Version de PHP :  7.2.12-1+ubuntu16.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `tick_ateliers`
--

-- --------------------------------------------------------

--
-- Structure de la table `answer`
--

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `issue_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `answer`
--

INSERT INTO `answer` (`id`, `body`, `is_active`, `created_at`, `updated_at`, `user_id`, `issue_id`) VALUES
(1, 'ille hac tam eximia fortuna propter utilitatem rei publicae frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:51:00', NULL, 4, 1),
(2, 'ille hac tam eximia fortuna propter utilitatem rei publicae fortuna ut omnia illa conficiat, quid ego, senator, facere frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:53:00', NULL, 2, 1),
(3, 'ille hac tam eximia fortuna propter utilitatem rei publicae fortuna ut omnia illa conficiat, quid ego, senator, facere frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:54:00', NULL, 3, 1),
(4, 'ille hac tam eximia fortuna propter utilitatem rei publicae fortuna ut omnia illa conficiat, quid ego, senator, facere frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:55:00', NULL, 1, 1),
(5, 'ille hac tam eximia fortuna propter utilitatem rei publicae frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:51:00', NULL, 4, 3),
(11, 'ille hac tam eximia fortuna propter utilitatem rei publicae frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:51:00', NULL, 4, 4),
(12, 'ille hac tam eximia fortuna ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:53:00', NULL, 2, 4),
(13, 'ille hac tam eximia fortuna propter utilitatem rei publicae fortuna ut omnia illa conficiat, quid ego, senator, facere frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:54:00', NULL, 3, 4),
(14, 'ille hac tam eximia fortuna propter utilitatem rei publicae frui non properat, ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:51:00', NULL, 4, 5),
(15, 'ille hac tam eximia fortuna ut omnia illa conficiat, quid ego, senator, facere', 1, '2019-01-20 17:53:00', NULL, 2, 5);

-- --------------------------------------------------------

--
-- Structure de la table `issue`
--

CREATE TABLE `issue` (
  `id` int(11) NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `repo_url` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `owner_id` int(11) NOT NULL,
  `assigned_to_id` int(11) DEFAULT NULL,
  `priority_id` int(11) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `active_group` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `issue`
--

INSERT INTO `issue` (`id`, `title`, `description`, `repo_url`, `is_active`, `created_at`, `updated_at`, `owner_id`, `assigned_to_id`, `priority_id`, `status_id`, `active_group`) VALUES
(1, 'Je ne comprends rien à GitHub', 'Sed si ille hac tam eximia fortuna propter utilitatem rei publicae frui non properat, ut omnia illa conficiat, quid ego, senator, facere debeo...', 'www.github.com', 1, '2019-01-20 17:51:00', NULL, 2, NULL, 3, 1, 'Lunar'),
(2, 'J’adore JavaScript, est-ce normal ?', 'Quam ob rem cave Catoni anteponas ne istum quidem ipsum, quem Apollo, ut ais, sapientissimum iudicavit; huius enim facta, ut iam cum utroque...', 'www.github.com', 1, '2019-01-19 16:32:00', NULL, 3, 1, 2, 1, 'Journey'),
(3, 'Redux, c’est quoi ce délire ???', 'Haec ubi latius permovissent, quoniam magister equitum longius ea tempestate distinebatur, iussus comes orientis ...', 'www.github.com', 1, '2019-01-28 17:51:00', NULL, 1, NULL, 3, 1, 'Lunar'),
(4, 'J’aurais du choisir la spé React...', 'Atque, ut Tullius ait, ut etiam ferae fame monitae revertuntur, ita homines instar turbinis degressi montibus impeditis et ardu loca ...', 'www.github.com', 1, '2019-01-19 17:30:00', NULL, 4, 5, 1, 1, 'React'),
(5, 'J’ai supprimé mon repo ainsi que ma vie !', 'Sed si ille hac tam eximia, quid ego, senator, facere debeo, quem, etiamsi ille aliud vellet rei publicae ...', 'www.github.com', 1, '2019-01-18 15:11:00', NULL, 2, 6, 3, 1, 'React'),
(6, 'Nouvelle issue', 'Quae principibus localibus multas adsidue per per multas mos Syriae expeditioni ut tenus invito est mos vel ultima prope profecturus specie egere aerumnis id mos sperabatur difficilisque invito Theophilum localibus localibus principibus rectore egere Theophilum expeditioni provinciis Gallus haec Syriae.', NULL, 1, '2019-02-01 11:41:58', NULL, 7, NULL, 2, 1, 'Nova'),
(7, 'Nouvelle issue 2', 'Quae principibus localibus multas adsidue per per multas mos Syriae expeditioni ut tenus invito est mos vel ultima prope profecturus specie egere aerumnis id mos sperabatur difficilisque invito Theophilum localibus localibus principibus rectore egere Theophilum expeditioni provinciis Gallus haec Syriae.\r\n\r\nqdsfqsfdqsfsdfg dsf jbsdfj dsff jsiqdfb liqsjdfb ', NULL, 1, '2019-02-01 11:44:58', NULL, 8, NULL, 3, 1, 'Nova'),
(8, 'Nouvelle issue 3', 'Quae principibus localibus multas adsidue per per multas mos Syriae expeditioni ut tenus invito est mos vel ultima prope profecturus specie egere aerumnis id mos sperabatur difficilisque invito Theophilum localibus localibus principibus rectore egere Theophilum expeditioni provinciis Gallus haec Syriae.\r\n\r\nqdsfqsfdqsfsdfg dsf jbsdfj dsff jsiqdfb liqsjdfb \r\n\r\nqsdkjqsbdjkqsd\r\n\r\nqsdlqsdlkqsdjlqs', NULL, 1, '2019-02-01 11:24:58', NULL, 8, NULL, 3, 1, 'Nova');

-- --------------------------------------------------------

--
-- Structure de la table `issue_tag`
--

CREATE TABLE `issue_tag` (
  `issue_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `issue_tag`
--

INSERT INTO `issue_tag` (`issue_id`, `tag_id`) VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 1),
(3, 2),
(3, 6),
(4, 1),
(4, 5),
(5, 8);

-- --------------------------------------------------------

--
-- Structure de la table `migration_versions`
--

CREATE TABLE `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `migration_versions`
--

INSERT INTO `migration_versions` (`version`, `executed_at`) VALUES
('20190125171732', '2019-01-25 17:18:26'),
('20190128094348', '2019-01-28 09:44:04'),
('20190128095743', '2019-01-28 09:57:55'),
('20190128101247', '2019-01-28 10:12:57'),
('20190128133408', '2019-01-28 13:34:20'),
('20190128135639', '2019-01-28 13:56:48'),
('20190129083710', '2019-01-29 08:37:29'),
('20190201083933', '2019-02-01 11:21:34'),
('20190201105905', '2019-02-01 11:21:34');

-- --------------------------------------------------------

--
-- Structure de la table `priority`
--

CREATE TABLE `priority` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `priority`
--

INSERT INTO `priority` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Faible', 1, '2019-01-28 15:14:16', NULL),
(2, 'Moyenne', 1, '2019-01-28 15:14:16', NULL),
(3, 'Haute', 1, '2019-01-28 15:14:16', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `promotion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `project`
--

INSERT INTO `project` (`id`, `name`, `is_active`, `created_at`, `updated_at`, `promotion_id`) VALUES
(1, 'Tick\'Ateliers', 1, '2019-01-28 15:52:05', NULL, 11),
(2, 'Des Cheveux pour tous', 1, '2019-01-28 15:52:05', NULL, 11),
(3, 'In.Management', 1, '2019-01-28 15:52:05', NULL, 11),
(4, 'Le journal de bébé', 1, '2019-01-28 15:52:05', NULL, 11),
(5, 'La Frai\'Chevrerie', 1, '2019-01-28 15:52:05', NULL, 11),
(6, 'Le Monde se Divise en Deux', 1, '2019-01-28 15:52:05', NULL, 11),
(7, 'Aetherlust', 0, '2019-01-28 15:52:05', NULL, 8),
(8, 'esport Arena', 0, '2019-01-28 15:52:05', NULL, 9);

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `promotion`
--

INSERT INTO `promotion` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'BigBang', 1, '2019-01-28 15:33:35', NULL),
(2, 'Cosmos', 1, '2019-01-28 15:33:35', NULL),
(3, 'Discovery', 1, '2019-01-28 15:33:35', NULL),
(4, 'Explorer', 1, '2019-01-28 15:33:35', NULL),
(5, 'Fusion', 1, '2019-01-28 15:33:35', NULL),
(6, 'Galaxy', 1, '2019-01-28 15:33:35', NULL),
(7, 'Hyperspace', 1, '2019-01-28 15:33:35', NULL),
(8, 'Invaders', 1, '2019-01-28 15:33:35', NULL),
(9, 'Journey', 1, '2019-01-28 15:33:35', NULL),
(10, 'Krypton', 1, '2019-01-28 15:33:35', NULL),
(11, 'Lunar', 1, '2019-01-28 15:33:35', NULL),
(12, 'Meteor', 1, '2019-01-28 15:33:35', NULL),
(13, 'Nova', 1, '2019-01-28 15:33:35', NULL),
(14, 'Orion', 1, '2019-01-28 15:33:35', NULL),
(15, 'Pulsar', 1, '2019-01-28 15:33:35', NULL),
(16, 'Quantum', 1, '2019-01-28 15:33:35', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `role`
--

INSERT INTO `role` (`id`, `code`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'ROLE_ADMIN', 'Professeur', 1, '2019-01-28 11:00:00', NULL),
(2, 'ROLE_USER', 'Etudiant', 1, '2019-01-28 11:00:00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `speciality`
--

CREATE TABLE `speciality` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `promotion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `speciality`
--

INSERT INTO `speciality` (`id`, `name`, `is_active`, `created_at`, `updated_at`, `promotion_id`) VALUES
(1, 'React', 1, '2019-01-28 15:38:43', NULL, 9),
(2, 'Wordpress', 1, '2019-01-28 15:38:43', NULL, 9),
(3, 'Symfony', 1, '2019-01-28 15:38:43', NULL, 9),
(4, 'React', 1, '2019-02-01 09:44:49', NULL, 10),
(5, 'Wordpress', 1, '2019-02-01 09:45:59', NULL, 10),
(6, 'Symfony', 1, '2019-02-01 09:45:59', NULL, 10),
(7, 'React', 1, '2019-02-01 09:47:52', NULL, 11),
(8, 'Wordpress', 1, '2019-02-01 09:47:52', NULL, 11),
(9, 'Symfony', 1, '2019-02-01 09:48:17', NULL, 11),
(10, 'React', 1, '2019-02-01 10:12:31', NULL, 12),
(11, 'Wordpress', 1, '2019-02-01 10:12:31', NULL, 12),
(12, 'Symfony', 1, '2019-02-01 10:12:47', NULL, 12),
(13, 'React', 1, '2019-02-01 10:18:14', NULL, 8),
(14, 'Wordpress', 1, '2019-02-01 10:18:14', NULL, 8),
(15, 'Symfony', 1, '2019-02-01 10:18:28', NULL, 8),
(16, 'React', 1, '2019-02-01 10:19:58', NULL, 13),
(17, 'Wordpress', 1, '2019-02-01 10:19:58', NULL, 13),
(18, 'Symfony', 1, '2019-02-01 10:20:10', NULL, 13);

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `status`
--

INSERT INTO `status` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Ouvert', 1, '2019-01-28 15:57:38', NULL),
(2, 'Fermé', 1, '2019-01-28 15:57:38', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `tag`
--

INSERT INTO `tag` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'php', 1, '2019-01-28 15:11:47', NULL),
(2, 'js', 1, '2019-01-28 15:11:47', NULL),
(3, 'html', 1, '2019-01-28 15:11:47', NULL),
(4, 'css', 1, '2019-01-28 15:11:47', NULL),
(5, 'symfony', 1, '2019-01-28 15:11:47', NULL),
(6, 'react', 1, '2019-01-28 15:11:47', NULL),
(7, 'wordpress', 1, '2019-01-28 15:11:47', NULL),
(8, 'git', 1, '2019-01-28 15:11:47', NULL),
(9, 'other', 1, '2019-01-28 15:11:47', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstname` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `lastname` varchar(75) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `username` varchar(75) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `firstname`, `lastname`, `email`, `is_active`, `created_at`, `updated_at`, `role_id`, `username`) VALUES
(1, 'Frédéric', 'Demoulin', 'freddmn08@gmail.com', 1, '2019-01-28 10:00:00', NULL, 1, 'freddmn08'),
(2, 'Nicolas', 'Paviot', 'nicolaspaviot@gmail.com', 1, '2019-01-28 08:00:00', NULL, 2, 'Rule2k'),
(3, 'Bertrand', 'Parroche', 'bertrand.parroche@gmail.com', 1, '2019-01-28 10:00:00', NULL, 2, 'bertrand74'),
(4, 'Pierre', 'Vinarnick', 'pedroconchito@hotmail.com', 1, '2019-01-28 11:00:00', NULL, 2, 'T0din'),
(5, 'Christophe', 'Deneuve', 'christophe@oclock.io', 1, '2019-01-28 16:20:41', NULL, 1, 'christopheOclock'),
(6, 'Benjamin', 'Cordier', 'benjamin@oclock.io', 1, '2019-01-28 16:20:41', NULL, 1, 'benoclock'),
(7, 'Marc', 'Madiot', 'marc@oclock.io', 1, '2019-02-01 11:39:54', NULL, 2, 'marcmadiot'),
(8, 'Adil', 'Ab', 'ab@oclock.io', 1, '2019-02-01 11:42:54', NULL, 2, 'abab');

-- --------------------------------------------------------

--
-- Structure de la table `user_project`
--

CREATE TABLE `user_project` (
  `user_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `user_project`
--

INSERT INTO `user_project` (`user_id`, `project_id`) VALUES
(1, 1),
(2, 1),
(3, 8),
(4, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user_promotion`
--

CREATE TABLE `user_promotion` (
  `user_id` int(11) NOT NULL,
  `promotion_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `user_promotion`
--

INSERT INTO `user_promotion` (`user_id`, `promotion_id`) VALUES
(1, 11),
(2, 11),
(3, 9),
(3, 11),
(4, 11),
(7, 13),
(8, 13);

-- --------------------------------------------------------

--
-- Structure de la table `user_speciality`
--

CREATE TABLE `user_speciality` (
  `user_id` int(11) NOT NULL,
  `speciality_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Contenu de la table `user_speciality`
--

INSERT INTO `user_speciality` (`user_id`, `speciality_id`) VALUES
(2, 7),
(3, 2),
(3, 7),
(4, 7),
(7, 16);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_DADD4A25A76ED395` (`user_id`),
  ADD KEY `IDX_DADD4A255E7AA58C` (`issue_id`);

--
-- Index pour la table `issue`
--
ALTER TABLE `issue`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_12AD233E7E3C61F9` (`owner_id`),
  ADD KEY `IDX_12AD233EF4BD7827` (`assigned_to_id`),
  ADD KEY `IDX_12AD233E497B19F9` (`priority_id`),
  ADD KEY `IDX_12AD233E6BF700BD` (`status_id`);

--
-- Index pour la table `issue_tag`
--
ALTER TABLE `issue_tag`
  ADD PRIMARY KEY (`issue_id`,`tag_id`),
  ADD KEY `IDX_8C0D6ABE5E7AA58C` (`issue_id`),
  ADD KEY `IDX_8C0D6ABEBAD26311` (`tag_id`);

--
-- Index pour la table `migration_versions`
--
ALTER TABLE `migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `priority`
--
ALTER TABLE `priority`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_2FB3D0EE139DF194` (`promotion_id`);

--
-- Index pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `speciality`
--
ALTER TABLE `speciality`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_8D93D649D60322AC` (`role_id`);

--
-- Index pour la table `user_project`
--
ALTER TABLE `user_project`
  ADD PRIMARY KEY (`user_id`,`project_id`),
  ADD KEY `IDX_77BECEE4A76ED395` (`user_id`),
  ADD KEY `IDX_77BECEE4166D1F9C` (`project_id`);

--
-- Index pour la table `user_promotion`
--
ALTER TABLE `user_promotion`
  ADD PRIMARY KEY (`user_id`,`promotion_id`),
  ADD KEY `IDX_C1FDF035A76ED395` (`user_id`),
  ADD KEY `IDX_C1FDF035139DF194` (`promotion_id`);

--
-- Index pour la table `user_speciality`
--
ALTER TABLE `user_speciality`
  ADD PRIMARY KEY (`user_id`,`speciality_id`),
  ADD KEY `IDX_54B06662A76ED395` (`user_id`),
  ADD KEY `IDX_54B066623B5A08D7` (`speciality_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `answer`
--
ALTER TABLE `answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT pour la table `issue`
--
ALTER TABLE `issue`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `priority`
--
ALTER TABLE `priority`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT pour la table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT pour la table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `speciality`
--
ALTER TABLE `speciality`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `FK_DADD4A255E7AA58C` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`),
  ADD CONSTRAINT `FK_DADD4A25A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `issue`
--
ALTER TABLE `issue`
  ADD CONSTRAINT `FK_12AD233E497B19F9` FOREIGN KEY (`priority_id`) REFERENCES `priority` (`id`),
  ADD CONSTRAINT `FK_12AD233E6BF700BD` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`),
  ADD CONSTRAINT `FK_12AD233E7E3C61F9` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FK_12AD233EF4BD7827` FOREIGN KEY (`assigned_to_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `issue_tag`
--
ALTER TABLE `issue_tag`
  ADD CONSTRAINT `FK_8C0D6ABE5E7AA58C` FOREIGN KEY (`issue_id`) REFERENCES `issue` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_8C0D6ABEBAD26311` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `FK_2FB3D0EE139DF194` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649D60322AC` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

--
-- Contraintes pour la table `user_project`
--
ALTER TABLE `user_project`
  ADD CONSTRAINT `FK_77BECEE4166D1F9C` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_77BECEE4A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_promotion`
--
ALTER TABLE `user_promotion`
  ADD CONSTRAINT `FK_C1FDF035139DF194` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_C1FDF035A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `user_speciality`
--
ALTER TABLE `user_speciality`
  ADD CONSTRAINT `FK_54B066623B5A08D7` FOREIGN KEY (`speciality_id`) REFERENCES `speciality` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_54B06662A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
