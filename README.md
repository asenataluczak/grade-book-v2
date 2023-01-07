# Dziennik lekcyjny

## Narzędzia użyte do stworzenia projektu:
 - Angular 15.x (HTML5, CSS3)
 - Bootstrap
 - PHP 8.x
 - Baza danych (Maria DB)

## Funkcjonalności:
 - System rejestracji i logowania oparty o bazę danych (szyfrowanie hasła)
 - Dodawanie nowych użytkowników do bazy danych (rejestracja lub administrator, szyfrowanie hasła)
 - Trzy poziomy uprawnień (student, nauczyciel, administrator). Po prawidłowym zalogowaniu wyświetlają się różne strony w zależności od poziomu uprawnień
 - Zarządzanie użytkownikami w panelu administracyjnym (CRUD):
   - Dodawanie/usuwanie/modyfikacja użytkownika
   - Wyświetlanie wszystkich użytkowników/pojedynczego użytkownika
 - Walidacja danych w formularzach (wyrażenia regularne)
 - Możliwość wpisywania ocen dla uczniów (nauczyciel, administrator)
 - Wyświetlanie ocen (uczeń)
 - Historia modyfikacji ocen
 - Zabezpieczenie przed SQL Injection
