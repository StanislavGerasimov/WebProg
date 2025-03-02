<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:xforms="http://www.w3.org/2002/xforms"
                version="1.0">
    <!-- Шаблон для основної обробки -->
    <xsl:output method="html" indent="yes"/>

    <xsl:template match="/xhtml">
        <html>
            <head>
                <title>Анкета для вступу до університету</title>
                <link rel="stylesheet" href="style.css"/>
            </head>
            <body>
                <div class="container">
                    <h1>Анкета для вступу до університету</h1>
                    <form action="submit_form.php" method="post">
                        <!-- Ім'я -->
                        <label for="firstName">Ім'я</label>
                        <input type="text" id="firstName" name="firstName" value=""/>

                        <!-- Прізвище -->
                        <label for="lastName">Прізвище</label>
                        <input type="text" id="lastName" name="lastName" value=""/>

                        <!-- По батькові -->
                        <label for="middleName">По батькові</label>
                        <input type="text" id="middleName" name="middleName" value=""/>

                        <!-- Попереднє місце навчання -->
                        <label for="previousSchool">Попереднє місце навчання</label>
                        <input type="text" id="previousSchool" name="previousSchool" value=""/>

                        <!-- Вибір факультету -->
                        <label for="faculty">Факультет</label>
                        <select id="faculty" name="faculty">
                            <option value="computerScience">Факультет комп'ютерних наук</option>
                            <option value="medicine">Факультет медицини</option>
                            <option value="law">Юридичний факультет</option>
                            <option value="business">Факультет бізнесу</option>
                            <option value="arts">Факультет мистецтв</option>
                        </select>

                        <!-- Кнопка подачі заявки -->
                        <input type="submit" value="Подати заявку"/>
                    </form>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
