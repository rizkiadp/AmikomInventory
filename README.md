
### Kebutuhan

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/download/current)
- [PostgreSQL](https://www.postgresql.org/download/)

Buat Envyroment PortgresSQL
### Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/rizkiadp/AmikomInventory.git
   ```

2. Navigate to the project directory:

   ```bash
   cd AmikomInventory
   ```

3. Create a `.env` file (further configuration needed to match your Postgres database settings):

   ```bash
   cp .env-example .env
   ```

4. Install the dependencies:

   ```bash
   npm install
   ```

5. Create the database:

   ```bash
   npm run setup-db
   ```

## Running Locally

1. Start the project:

   ```bash
   npm start
   ```

2. Visit [http://localhost:3000](http://localhost:3000) (this may vary depending on the `HOSTNAME` and `PORT` values you set in the `.env` file).
