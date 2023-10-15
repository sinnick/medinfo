import { connect, connection } from 'mongoose';

const conn = {
    isConnected: false,
}



export async function dbConnect() {
    if (conn.isConnected) return;
    const db = await connect(process.env.MOGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    });
    conn.isConnected = db.connections[0].readyState;
    console.log('MongoDB connected, DB:', db.connection.db.databaseName);
}


connection.on('error', console.error.bind(console, 'connection error:'));
connection.on('connected', () => {
    console.log('MongoDB connected');
});

