markdown_content = """
# Database Interaction Techniques in NestJS with TypeORM and Mongoose

## Overview of TypeORM and Mongoose
**TypeORM** is an Object-Relational Mapper (ORM) that works with TypeScript and JavaScript. It allows developers to interact with databases in a more abstract way while still providing the flexibility of raw SQL queries when necessary.

**Mongoose** is an ODM (Object Data Modeling) library for MongoDB and Node.js, providing a straightforward schema-based solution to model application data.

### Key Features of TypeORM
- Easy to use and integrates seamlessly with NestJS.
- Supports various databases (MySQL, PostgreSQL, SQLite, etc.).
- Provides decorators for defining entities and relationships.
- Built-in support for migrations and seeding.

### Key Features of Mongoose
- Schema-based modeling for MongoDB.
- Middleware support for pre and post hooks.
- Built-in type casting, validation, and query building.
- Easy to work with complex relationships.

---

### 1. Setting Up TypeORM and Mongoose in NestJS

## TypeORM Installation
To get started with TypeORM, install the necessary packages:

```
npm install @nestjs/typeorm typeorm mysql2
npm install @nestjs/mongoose mongoose
```
## TypeORM Configuration
Set up TypeORM in the AppModule.

```
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Import your entities

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // or 'postgres', 'sqlite', etc.
      host: 'localhost',
      port: 3306,
      username: 'test',
      password: 'test',
      database: 'test',
      entities: [User],
      synchronize: true, // Use only in development
    }),
  ],
})
export class AppModule {}
```
Set up Mongoose in the AppModule.

```
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema'; // Import your schema

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'), // MongoDB URI
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class AppModule {}

```
Define an entity using TypeORM decorators.

```
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
}

```

Implement CRUD operations in a service.

```
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create single
  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  // Create multiple
  async createMultiple(users: User[]): Promise<User[]> {
    return this.userRepository.save(users);
  }

  // Read single
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  // Read multiple
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Update single
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  // Delete single
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}

```


Define a schema using Mongoose.

```
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

```
Implement CRUD operations in a service

```
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create single
  async create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // Create multiple
  async createMultiple(users: User[]): Promise<User[]> {
    return this.userModel.insertMany(users);
  }

  // Read single
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  // Read multiple
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Update single
  async update(id: string, user: Partial<User>): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
  }

  // Delete single
  async delete(id: string): Promise<User> {
    return this.userModel.findByIdAndDelete(id).exec();
  }
}

```
Model methods can be implemented as static or instance methods in your entity class.

```
@Entity()
export class User {
  // ... previous definitions

  static async findByEmail(email: string, userRepository: Repository<User>): Promise<User | undefined> {
    return userRepository.findOne({ where: { email } });
  }
}
```
Mongoose supports instance and static methods directly in the schema.
```
@Schema()
export class User {
  // ... previous definitions

  static async findByEmail(email: string): Promise<UserDocument | null> {
    return this.findOne({ email }).exec();
  }
}
```

### 2. Signals
You can listen for entity lifecycle events using decorators.

```
import { Entity, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  // ... previous definitions

  @BeforeInsert()
  logInsert() {
    console.log('Inserting User:', this);
  }
}

```

Mongoose supports middleware (pre and post hooks) for lifecycle events.

```
@Schema()
export class User {
  // ... previous definitions
}

UserSchema.pre('save', function(next) {
  console.log('Before saving user:', this);
  next();
});

```

### 3. Database Associations

TypeORM supports various types of relationships.
```
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.posts)
  user: User;
}

```

Mongoose supports population for relationships.
```
@Schema()
export class Post {
  @Prop({ type: Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

// Populate in service
const posts = await Post.find().populate('user').exec();
```
