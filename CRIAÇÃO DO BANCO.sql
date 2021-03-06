DROP TABLE IF EXISTS TIPO_COLUNA CASCADE;
CREATE TABLE IF NOT EXISTS TIPO_COLUNA(
	ID SERIAL PRIMARY KEY,
	DESCRICAO VARCHAR NOT NULL,
	VALOR VARCHAR NOT NULL
);

DROP TABLE IF exists CATEGORIA CASCADE;
create table if not exists CATEGORIA (
	ID SERIAL primary key,
	DESCRICAO VARCHAR (70) not NULL,
	ATIVA BIT NOT NULL default '1'
);

drop table if exists tabela CASCADE;
create table if not exists tabela(
	ID SERIAL primary key,
	NOME VARCHAR (70) not NULL UNIQUE,
	ATIVA BIT NOT NULL DEFAULT '1',
	CATEGORIA_ID INT not null,
	FOREIGN KEY (CATEGORIA_ID) references CATEGORIA(ID)
);

drop table if exists coluna CASCADE;
CREATE TABLE COLUNA(
	ID SERIAL primary KEY,
	NOME VARCHAR(255),
	VAZIO BIT NOT NULL,
	TIPO_COLUNA_ID INT NOT NULL,
	FOREIGN KEY (TIPO_COLUNA_ID) REFERENCES TIPO_COLUNA(ID),
	TABELA_ID INT NOT NULL,
	FOREIGN KEY (TABELA_ID) REFERENCES TABELA(ID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS PLANILHA_EXCEL CASCADE;
CREATE TABLE IF NOT EXISTS PLANILHA_EXCEL(
	ID SERIAL PRIMARY KEY,
	DESCRICAO VARCHAR(150) NOT NULL,
	QTD_REGISTROS INT NOT NULL,
	TABELA_ID INT NOT NULL,
	FOREIGN KEY(TABELA_ID) REFERENCES TABELA(ID)
);

DROP TABLE IF EXISTS MENSAGEM_IMPORTACAO CASCADE;
CREATE TABLE IF NOT EXISTS MENSAGEM_IMPORTACAO(
	ID SERIAL PRIMARY KEY,
	DESCRICAO VARCHAR(255)
);

DROP TABLE IF EXISTS LOGIMPORTACAO;
CREATE TABLE IF NOT EXISTS LOGIMPORTACAO(
	ID SERIAL PRIMARY KEY,
	NOME_TABELA VARCHAR(70) NOT NULL,
	NOME_USUARIO VARCHAR(100) NOT NULL,
	DATA_HORA TIMESTAMP NOT NULL,
	MENSAGEM_IMPORTACAO_ID INT NOT NULL,
	FOREIGN KEY (MENSAGEM_IMPORTACAO_ID) REFERENCES MENSAGEM_IMPORTACAO(ID),
	PLANILHA_EXCEL_ID INT NOT NULL,
	FOREIGN KEY (PLANILHA_EXCEL_ID) REFERENCES PLANILHA_EXCEL(ID)
);

DROP TABLE IF EXISTS TAG CASCADE;
CREATE TABLE IF NOT EXISTS TAG(
	ID SERIAL PRIMARY KEY,
	DESCRICAO VARCHAR(70) NOT NULL
);

DROP TABLE IF EXISTS CATEGORIA_TAG;
CREATE TABLE IF NOT EXISTS CATEGORIA_TAG(
	ID SERIAL PRIMARY KEY,
	CATEGORIA_ID INT NOT NULL,
	FOREIGN KEY (CATEGORIA_ID) REFERENCES CATEGORIA(ID),
	TAG_ID INT NOT NULL,
	FOREIGN KEY (TAG_ID) REFERENCES TAG(ID)
);

DROP TABLE IF EXISTS TABELA_TAG;
CREATE TABLE IF NOT EXISTS TABELA_TAG(
	ID SERIAL PRIMARY KEY,
	TABELA_ID INT NOT NULL,
	FOREIGN KEY (TABELA_ID) REFERENCES TABELA(ID),
	TAG_ID INT NOT NULL,
	FOREIGN KEY (TAG_ID) REFERENCES TAG(ID)
);

-- DROP TABLE IF EXISTS OPERACAO CASCADE;
-- CREATE TABLE IF NOT EXISTS OPERACAO(
-- 	ID SERIAL PRIMARY KEY,
-- 	OPERACAO TEXT NOT NULL,
-- 	DATA_HORA TIMESTAMP NOT NULL default current_timestamp
-- );

DROP TABLE IF EXISTS DEPARTAMENTO CASCADE;
CREATE TABLE IF NOT EXISTS DEPARTAMENTO(
	ID SERIAL PRIMARY KEY,
	DESCRICAO VARCHAR(100) NOT NULL,
	ATIVO BIT NOT NULL default '1'
);

DROP TABLE IF EXISTS TIPO_ACESSO CASCADE;
CREATE TABLE IF NOT EXISTS TIPO_ACESSO (
	ID SERIAL PRIMARY KEY,
	DESCRICAO VARCHAR(50)
);

DROP TABLE IF EXISTS USUARIO CASCADE;
CREATE TABLE IF NOT EXISTS USUARIO(
	ID SERIAL PRIMARY KEY,
	NOME VARCHAR(100) NOT NULL UNIQUE,
	EMAIL VARCHAR(80) NOT NULL UNIQUE,
	ATIVO BIT NOT NULL DEFAULT '1',
	SENHA VARCHAR NOT NULL,
	DEPARTAMENTO_ID INT NOT NULL,
	FOREIGN KEY (DEPARTAMENTO_ID) REFERENCES DEPARTAMENTO(ID),
	TIPO_ACESSO_ID INT NOT NULL,
	FOREIGN KEY (TIPO_ACESSO_ID) REFERENCES TIPO_ACESSO(ID)
);

-- DROP TABLE IF EXISTS TABELA_OPERACAO_USUARIO;
-- CREATE TABLE IF NOT EXISTS TABELA_OPERACAO_USUARIO(
-- 	ID SERIAL PRIMARY KEY,
-- 	OPERACAO_ID INT NOT NULL,
-- 	FOREIGN KEY (OPERACAO_ID) REFERENCES OPERACAO(ID),
-- 	TABELA_ID INT NOT NULL,
-- 	FOREIGN KEY (TABELA_ID) REFERENCES TABELA(ID),
-- 	USUARIO_ID INT NOT NULL,
-- 	FOREIGN KEY (USUARIO_ID) REFERENCES USUARIO(ID)
-- );

DROP TABLE IF EXISTS LOG_OPERACAO_TABELA;
CREATE TABLE IF NOT EXISTS LOG_OPERACAO_TABELA(
	ID SERIAL PRIMARY KEY,
	OPERACAO VARCHAR,
	TABELA VARCHAR (50) NOT NULL,
	USUARIO VARCHAR (50) NOT NULL,
	DATA_HORA timestamp DEFAULT current_timestamp
);

DROP TABLE IF EXISTS DIREITO_LEITURA_ESCRITA CASCADE;
CREATE TABLE IF NOT EXISTS DIREITO_LEITURA_ESCRITA(
	ID SERIAL PRIMARY KEY,
	DESCRICAO VARCHAR(50)
);

DROP TABLE IF EXISTS LIBERA_DIREITO_LEITURA_ESCRITA_TABELA_USUARIO;
CREATE TABLE IF NOT EXISTS LIBERA_DIREITO_LEITURA_ESCRITA_TABELA_USUARIO(
	ID SERIAL PRIMARY KEY,
	DIREITO_LEITURA_ESCRITA_ID INT NOT NULL,
	FOREIGN KEY (DIREITO_LEITURA_ESCRITA_ID) REFERENCES DIREITO_LEITURA_ESCRITA(ID),
	TABELA_ID INT NOT NULL,
	FOREIGN KEY (TABELA_ID) REFERENCES TABELA(ID),
	USUARIO_ID INT NOT NULL,
	FOREIGN KEY (USUARIO_ID) REFERENCES USUARIO(ID)
);

DROP TABLE IF EXISTS LOG_SISTEMA;
CREATE TABLE IF NOT EXISTS LOG_SISTEMA(
	ID SERIAL PRIMARY KEY,
	CAMPO VARCHAR(255) NOT NULL,
	USUARIO VARCHAR(100) NOT NULL,
	VALOR_ANTIGO VARCHAR NOT NULL,
	VALOR_NOVO VARCHAR NOT NULL,
	DATA_HORA TIMESTAMP NOT NULL,
	TABELA VARCHAR(100)
);

/*CREATE VIEWS*/
drop view if exists get_users;
create view get_users
as
select 
	usuario.id,
	usuario.nome,
	usuario.email,
	usuario.ativo,
	case 
		when (usuario.ativo = '1') then'Ativo'
		else 'Desativado'
	end as ativo_descricao, 
	usuario.departamento_id,
	departamento.descricao as departamento_descricao,
	usuario.TIPO_ACESSO_id,
	tipo_acesso.descricao as tipo_acesso_descricao,
	usuario.senha
from usuario

inner join departamento
on usuario.departamento_id = departamento.id

inner join tipo_acesso
on usuario.tipo_acesso_id = tipo_acesso.id

order by usuario.id;

drop view if exists get_tables;
create view get_tables
as
select
	tabela.id,
	tabela.nome,
	tabela.ativa,
	case 
		when (tabela.ativa = '1') then'Ativo'
		else 'Desativado'
	end as ativo_descricao, 
	tabela.categoria_id,
	categoria.descricao as categoria_descricao
from
	tabela

inner join categoria
on tabela.categoria_id = categoria.id

order by tabela.id;

drop view if exists get_columns;
create view get_columns
as
select
	coluna.id,
	coluna.nome,
	coluna.vazio,
	case
		when (coluna.vazio = '1') then 'Sim'
		else 'N??o'
	end as vazio_descricao,
	coluna.tipo_coluna_id,
	tipo_coluna.descricao as tipo_coluna_descricao,
	tipo_coluna.valor as tipo_coluna_valor,
	coluna.tabela_id
from
	coluna

inner join tipo_coluna
on coluna.tipo_coluna_id = tipo_coluna.id

order by coluna.id;

drop view if exists get_categorys;
create view get_categorys
as
select
	categoria.id,
	categoria.descricao,
	categoria.ativa,
	case
		when categoria.ativa = '1' then 'Ativa'
		else 'Inativa'
	end as ativa_descricao
from
	categoria

order by id;


drop view if exists get_departaments;
create view get_departaments
as
select
	departamento.id,
	departamento.descricao,
	departamento.ativo,
	case
		when departamento.ativo = '1' then 'Ativo'
		else 'Inativo'
	end as ativo_descricao
from
	departamento

order by id;

/*DEFAULT DATA*/
insert into TIPO_ACESSO(descricao) values ('Usuario'),('Supervisor'),('administrador');
insert into DEPARTAMENTO(descricao) values ('Administra????o'),('Gerencia'),('Financeiro');
insert into CATEGORIA(descricao) values ('Vendas'),('Comercial');
insert into usuario(nome, email, ativo, senha, departamento_id, tipo_acesso_id) values('teste','teste@teste.com','1','$2b$10$ukia9/3pO9VI6HOOQqpVu.T2Fq4.wGowA60MuHllzNkSY9oXNaqNS',1,1);
insert into tipo_coluna(descricao, valor) values ('Inteiro', 'INT'), ('Texto','VARCHAR'), ('N??mero','DECIMAL');

-- insert into tabela(nome, categoria_id) values ('Primeira', 1), ('Segunda',2);
-- insert into coluna(nome, vazio, tipo_coluna_id, tabela_id) values ('primeira','1',1,1),('segunda','0',2,1),('primeira','1',1,2);