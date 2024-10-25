import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;




// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const UserSchema = new mongoose.Schema({
//   // Basic Info
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true,
//     trim: true,
//     validate: {
//       validator: function(v) {
//         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
//       },
//       message: 'Please enter a valid email'
//     }
//   },
//   username: {
//     type: String,
//     required: [true, 'Username is required'],
//     unique: true,
//     trim: true,
//     minlength: [3, 'Username must be at least 3 characters long'],
//     maxlength: [30, 'Username cannot exceed 30 characters']
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters long'],
//     select: false // Don't return password by default
//   },
  
//   // Profile Information
//   profile: {
//     fullName: String,
//     avatar: String,
//     bio: {
//       type: String,
//       maxlength: [500, 'Bio cannot exceed 500 characters']
//     },
//     timezone: String,
//     preferences: {
//       theme: {
//         type: String,
//         enum: ['light', 'dark'],
//         default: 'light'
//       },
//       emailNotifications: {
//         type: Boolean,
//         default: true
//       }
//     }
//   },
  
//   // Collaboration & Workspace
//   ownedWorkspaces: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Workspace'
//   }],
//   collaboratingWorkspaces: [{
//     workspace: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Workspace'
//     },
//     role: {
//       type: String,
//       enum: ['viewer', 'editor', 'admin'],
//       default: 'viewer'
//     }
//   }],
//   ownedNotes: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Note'
//   }],
//   collaboratingNotes: [{
//     note: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Note'
//     },
//     permission: {
//       type: String,
//       enum: ['read', 'write'],
//       default: 'read'
//     },
//     lastAccessed: Date
//   }],
  
//   // Activity & Status
//   status: {
//     type: String,
//     enum: ['active', 'inactive', 'blocked'],
//     default: 'active'
//   },
//   lastActive: Date,
//   loginHistory: [{
//     timestamp: Date,
//     ip: String,
//     userAgent: String
//   }],
  
//   // Security
//   passwordResetToken: String,
//   passwordResetExpires: Date,
//   emailVerified: {
//     type: Boolean,
//     default: false
//   },
//   twoFactorEnabled: {
//     type: Boolean,
//     default: false
//   },
//   twoFactorSecret: String
// }, {
//   timestamps: true // Adds createdAt and updatedAt
// });

// // Pre-save middleware to hash password
// UserSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) return next();
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// // Instance methods
// UserSchema.methods = {
//   // Compare password for login
//   comparePassword: async function(candidatePassword) {
//     try {
//       return await bcrypt.compare(candidatePassword, this.password);
//     } catch (error) {
//       throw new Error(error);
//     }
//   },

//   // Generate JWT token
//   generateAuthToken: function() {
//     return jwt.sign(
//       { 
//         id: this._id,
//         email: this.email,
//         username: this.username
//       },
//       process.env.JWT_SECRET,
//       { expiresIn: '24h' }
//     );
//   },

//   // Generate password reset token
//   generatePasswordResetToken: function() {
//     const resetToken = crypto.randomBytes(32).toString('hex');
//     this.passwordResetToken = crypto
//       .createHash('sha256')
//       .update(resetToken)
//       .digest('hex');
    
//     this.passwordResetExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
//     return resetToken;
//   },

//   // Update last active timestamp
//   updateLastActive: function() {
//     this.lastActive = new Date();
//     return this.save();
//   },

//   // Add collaboration access
//   addCollaboration: async function(noteId, permission = 'read') {
//     if (!this.collaboratingNotes.some(collab => collab.note.equals(noteId))) {
//       this.collaboratingNotes.push({
//         note: noteId,
//         permission,
//         lastAccessed: new Date()
//       });
//       await this.save();
//     }
//   }
// };

// // Static methods
// UserSchema.statics = {
//   // Find by email with selected fields
//   findByEmail: function(email) {
//     return this.findOne({ email })
//       .select('email username profile status emailVerified');
//   },

//   // Get user's collaboration details
//   getCollaborations: async function(userId) {
//     return this.findById(userId)
//       .select('collaboratingNotes collaboratingWorkspaces')
//       .populate('collaboratingNotes.note', 'title lastModified')
//       .populate('collaboratingWorkspaces.workspace', 'name');
//   },

//   // Search users for collaboration
//   searchUsers: function(query) {
//     return this.find({
//       $or: [
//         { username: new RegExp(query, 'i') },
//         { 'profile.fullName': new RegExp(query, 'i') },
//         { email: new RegExp(query, 'i') }
//       ]
//     })
//     .select('username email profile.fullName profile.avatar')
//     .limit(10);
//   }
// };

// // Indexes
// UserSchema.index({ email: 1 });
// UserSchema.index({ username: 1 });
// UserSchema.index({ 'profile.fullName': 1 });

// const User = mongoose.model('User', UserSchema);

// module.exports = User;