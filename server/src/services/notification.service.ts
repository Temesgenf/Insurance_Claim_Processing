import { Server } from 'socket.io';

interface QueuedNotification {
  type: 'emit' | 'broadcast';
  claimNumber?: string;
  notification: {
    type: string;
    message: string;
    data?: any;
  };
}


export class NotificationService {
  private static io: Server;
  private static initialized: boolean = false;
  private static messageQueue: QueuedNotification[] = [];

  static initialize(io: Server) {
    if (!io) {
      throw new Error('Socket.IO instance is required for initialization');
    }
    this.io = io;
    this.initialized = true;
    console.log('NotificationService initialized successfully');
    this.processQueue();
  }

  private static processQueue() {
    while (this.messageQueue.length > 0) {
      const msg = this.messageQueue.shift();
      if (msg?.type === 'broadcast') {
        this.io.emit('notification', msg.notification);
      } else if (msg?.type === 'emit' && msg.claimNumber) {
        this.io.to(msg.claimNumber).emit('notification', msg.notification);
      }
    }
  }

  static emit(claimNumber: string, notification: {
    type: string;
    message: string;
    data?: any;
  }) {
    if (!this.initialized) {
      console.log('Socket.IO not initialized yet - message queued for delivery');
      this.messageQueue.push({
        type: 'emit',
        claimNumber,
        notification
      });
      return;
    }
    this.io.to(claimNumber).emit('notification', notification);
  }

  static userSocketMap: Map<string, string> = new Map();
static registerUserSocket(userId: string, socketId: string) {
  this.userSocketMap.set(userId, socketId);
}

static removeUserSocket(userId: string) {
  this.userSocketMap.delete(userId);
}

  static emitToUser(userId: any, notification: {
    type: string;
    message: string;
    data?: any;
  }) {
    console.log('Attempting to emit to user:', userId);
    console.log('Current userSocketMap:', this.userSocketMap);
    console.log('Available user IDs:', Array.from(this.userSocketMap.keys()));
    
    const socketId = this.userSocketMap.get(userId);
    console.log('Found socketId for user:', socketId);
    
    if (socketId && this.initialized) {
      console.log("Emission working for user:", userId);
      this.io.to(socketId).emit("notification", notification);
    } else {
      console.log(`Socket for user ${userId} not found or not initialized.`);
      console.log('Initialized:', this.initialized);
      console.log('SocketId:', socketId);
    }
  }

  static broadcast(notification: {
    type: string;
    message: string;
    data?: any;
  }) {
    if (!this.initialized) {
      console.log('Socket.IO not initialized yet - broadcast message queued for delivery');
      this.messageQueue.push({
        type: 'broadcast',
        notification
      });
      return;
    }
    this.io.emit('notification', notification);
  }

  static isInitialized(): boolean {
    return this.initialized;
  }
}