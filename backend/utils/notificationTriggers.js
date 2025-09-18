const NotificationService = require("../services/NotificationService");
const User = require("../models/User");

class NotificationTriggers {
  // Lead notifications
  static async onLeadCreated(lead) {
    try {
      // Notify assigned user
      if (lead.assignedTo) {
        const assignedUser = await User.findById(lead.assignedTo);
        if (assignedUser) {
          await NotificationService.queueNotification({
            type: "email",
            data: {
              to: assignedUser.email,
              subject: "New Lead Assigned",
              templateData: {
                type: "lead_assigned",
                userName: assignedUser.fullName,
                leadName: lead.fullName,
                leadCompany: lead.company,
                leadEmail: lead.email,
                leadPhone: lead.phone,
              },
              organizationId: lead.organization,
              metadata: {
                userId: assignedUser._id,
                relatedTo: "lead",
                relatedId: lead._id,
                priority: "medium",
              },
            },
          });
        }
      }

      // Notify sales manager
      const salesManager = await User.findOne({
        organization: lead.organization,
        role: { $in: ["manager", "admin"] },
        "permissions.module": "leads",
      });

      if (salesManager) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: salesManager.email,
            subject: "New Lead Created",
            templateData: {
              type: "lead_created",
              managerName: salesManager.fullName,
              leadName: lead.fullName,
              leadCompany: lead.company,
              source: lead.source,
              estimatedValue: lead.estimatedValue,
            },
            organizationId: lead.organization,
            metadata: {
              userId: salesManager._id,
              relatedTo: "lead",
              relatedId: lead._id,
              priority: "medium",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error sending lead created notifications:", error);
    }
  }

  static async onLeadStatusChanged(lead, oldStatus, newStatus) {
    try {
      if (lead.assignedTo) {
        const assignedUser = await User.findById(lead.assignedTo);
        if (assignedUser) {
          await NotificationService.queueNotification({
            type: "email",
            data: {
              to: assignedUser.email,
              subject: "Lead Status Updated",
              templateData: {
                type: "lead_status_changed",
                userName: assignedUser.fullName,
                leadName: lead.fullName,
                oldStatus,
                newStatus,
                leadId: lead.leadId,
              },
              organizationId: lead.organization,
              metadata: {
                userId: assignedUser._id,
                relatedTo: "lead",
                relatedId: lead._id,
                priority: newStatus === "won" ? "high" : "medium",
              },
            },
          });
        }
      }
    } catch (error) {
      console.error("Error sending lead status change notifications:", error);
    }
  }

  // Deal notifications
  static async onDealCreated(deal) {
    try {
      const assignedUser = await User.findById(deal.assignedTo);
      if (assignedUser) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: assignedUser.email,
            subject: "New Deal Assigned",
            templateData: {
              type: "deal_assigned",
              userName: assignedUser.fullName,
              dealTitle: deal.title,
              dealValue: deal.value,
              currency: deal.currency,
              expectedCloseDate: deal.expectedCloseDate,
            },
            organizationId: deal.organization,
            metadata: {
              userId: assignedUser._id,
              relatedTo: "deal",
              relatedId: deal._id,
              priority: "high",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error sending deal created notifications:", error);
    }
  }

  static async onDealWon(deal) {
    try {
      // Notify assigned user
      const assignedUser = await User.findById(deal.assignedTo);
      if (assignedUser) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: assignedUser.email,
            subject: "Congratulations! Deal Won",
            templateData: {
              type: "deal_won",
              userName: assignedUser.fullName,
              dealTitle: deal.title,
              dealValue: deal.value,
              currency: deal.currency,
            },
            organizationId: deal.organization,
            metadata: {
              userId: assignedUser._id,
              relatedTo: "deal",
              relatedId: deal._id,
              priority: "high",
            },
          },
        });
      }

      // Notify sales team
      const salesTeam = await User.find({
        organization: deal.organization,
        role: { $in: ["sales", "manager", "admin"] },
      });

      for (const user of salesTeam) {
        if (user._id.toString() !== deal.assignedTo.toString()) {
          await NotificationService.queueNotification({
            type: "email",
            data: {
              to: user.email,
              subject: "Deal Won by Team Member",
              templateData: {
                type: "team_deal_won",
                userName: user.fullName,
                winnerName: assignedUser.fullName,
                dealTitle: deal.title,
                dealValue: deal.value,
                currency: deal.currency,
              },
              organizationId: deal.organization,
              metadata: {
                userId: user._id,
                relatedTo: "deal",
                relatedId: deal._id,
                priority: "medium",
              },
            },
          });
        }
      }
    } catch (error) {
      console.error("Error sending deal won notifications:", error);
    }
  }

  // Task notifications
  static async onTaskAssigned(task) {
    try {
      const assignedUser = await User.findById(task.assignedTo);
      const assignedByUser = await User.findById(task.assignedBy);

      if (assignedUser) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: assignedUser.email,
            subject: "New Task Assigned",
            templateData: {
              type: "task_assigned",
              userName: assignedUser.fullName,
              taskTitle: task.title,
              taskDescription: task.description,
              dueDate: task.dueDate,
              priority: task.priority,
              assignedBy: assignedByUser ? assignedByUser.fullName : "System",
            },
            organizationId: task.organization,
            metadata: {
              userId: assignedUser._id,
              relatedTo: "task",
              relatedId: task._id,
              priority: task.priority,
            },
          },
        });
      }
    } catch (error) {
      console.error("Error sending task assigned notifications:", error);
    }
  }

  static async onTaskDueSoon(task, hoursUntilDue) {
    try {
      const assignedUser = await User.findById(task.assignedTo);
      if (assignedUser) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: assignedUser.email,
            subject: "Task Due Soon",
            templateData: {
              type: "task_due_soon",
              userName: assignedUser.fullName,
              taskTitle: task.title,
              dueDate: task.dueDate,
              hoursUntilDue,
            },
            organizationId: task.organization,
            metadata: {
              userId: assignedUser._id,
              relatedTo: "task",
              relatedId: task._id,
              priority: "high",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error sending task due soon notifications:", error);
    }
  }

  static async onTaskOverdue(task) {
    try {
      const assignedUser = await User.findById(task.assignedTo);
      const assignedByUser = await User.findById(task.assignedBy);

      // Notify assigned user
      if (assignedUser) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: assignedUser.email,
            subject: "Task Overdue",
            templateData: {
              type: "task_overdue",
              userName: assignedUser.fullName,
              taskTitle: task.title,
              dueDate: task.dueDate,
            },
            organizationId: task.organization,
            metadata: {
              userId: assignedUser._id,
              relatedTo: "task",
              relatedId: task._id,
              priority: "urgent",
            },
          },
        });
      }

      // Notify task creator/manager
      if (
        assignedByUser &&
        assignedByUser._id.toString() !== assignedUser._id.toString()
      ) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: assignedByUser.email,
            subject: "Task Overdue - Action Required",
            templateData: {
              type: "task_overdue_manager",
              managerName: assignedByUser.fullName,
              assigneeName: assignedUser.fullName,
              taskTitle: task.title,
              dueDate: task.dueDate,
            },
            organizationId: task.organization,
            metadata: {
              userId: assignedByUser._id,
              relatedTo: "task",
              relatedId: task._id,
              priority: "urgent",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error sending task overdue notifications:", error);
    }
  }

  // Invoice notifications
  static async onInvoiceCreated(invoice) {
    try {
      const client = await invoice.populate("client");

      await NotificationService.queueNotification({
        type: "email",
        data: {
          to: client.email,
          subject: `Invoice ${invoice.invoiceNumber}`,
          templateData: {
            type: "invoice_created",
            clientName: client.fullName,
            invoiceNumber: invoice.invoiceNumber,
            total: invoice.total,
            currency: invoice.currency,
            dueDate: invoice.dueDate,
          },
          organizationId: invoice.organization,
          metadata: {
            relatedTo: "invoice",
            relatedId: invoice._id,
            priority: "medium",
          },
        },
      });
    } catch (error) {
      console.error("Error sending invoice created notifications:", error);
    }
  }

  static async onInvoiceOverdue(invoice) {
    try {
      const client = await invoice.populate("client");

      await NotificationService.queueNotification({
        type: "email",
        data: {
          to: client.email,
          subject: `Overdue Invoice ${invoice.invoiceNumber}`,
          templateData: {
            type: "invoice_overdue",
            clientName: client.fullName,
            invoiceNumber: invoice.invoiceNumber,
            total: invoice.total,
            currency: invoice.currency,
            dueDate: invoice.dueDate,
            daysPastDue: Math.floor(
              (new Date() - invoice.dueDate) / (1000 * 60 * 60 * 24)
            ),
          },
          organizationId: invoice.organization,
          metadata: {
            relatedTo: "invoice",
            relatedId: invoice._id,
            priority: "high",
          },
        },
      });
    } catch (error) {
      console.error("Error sending invoice overdue notifications:", error);
    }
  }

  // Project notifications
  static async onProjectCreated(project) {
    try {
      // Notify project manager
      const projectManager = await User.findById(project.projectManager);
      if (projectManager) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: projectManager.email,
            subject: "New Project Assigned",
            templateData: {
              type: "project_assigned",
              managerName: projectManager.fullName,
              projectName: project.name,
              startDate: project.timeline.startDate,
              endDate: project.timeline.endDate,
            },
            organizationId: project.organization,
            metadata: {
              userId: projectManager._id,
              relatedTo: "project",
              relatedId: project._id,
              priority: "high",
            },
          },
        });
      }

      // Notify team members
      for (const teamMember of project.team) {
        const user = await User.findById(teamMember.user);
        if (user) {
          await NotificationService.queueNotification({
            type: "email",
            data: {
              to: user.email,
              subject: "Added to New Project",
              templateData: {
                type: "project_team_added",
                userName: user.fullName,
                projectName: project.name,
                role: teamMember.role,
                managerName: projectManager.fullName,
              },
              organizationId: project.organization,
              metadata: {
                userId: user._id,
                relatedTo: "project",
                relatedId: project._id,
                priority: "medium",
              },
            },
          });
        }
      }
    } catch (error) {
      console.error("Error sending project created notifications:", error);
    }
  }

  // User notifications
  static async onUserCreated(user, tempPassword) {
    try {
      await NotificationService.queueNotification({
        type: "email",
        data: {
          to: user.email,
          subject: "Welcome to U Technology CRM",
          templateData: {
            type: "user_welcome",
            userName: user.fullName,
            email: user.email,
            tempPassword,
            loginUrl: process.env.CLIENT_URL,
          },
          organizationId: user.organization,
          metadata: {
            userId: user._id,
            relatedTo: "user",
            relatedId: user._id,
            priority: "high",
          },
        },
      });
    } catch (error) {
      console.error("Error sending user welcome notifications:", error);
    }
  }

  // System notifications
  static async onSystemMaintenance(organizationId, maintenanceDetails) {
    try {
      const users = await User.find({
        organization: organizationId,
        status: "active",
      });

      for (const user of users) {
        await NotificationService.queueNotification({
          type: "email",
          data: {
            to: user.email,
            subject: "Scheduled System Maintenance",
            templateData: {
              type: "system_maintenance",
              userName: user.fullName,
              startTime: maintenanceDetails.startTime,
              endTime: maintenanceDetails.endTime,
              description: maintenanceDetails.description,
            },
            organizationId,
            metadata: {
              userId: user._id,
              relatedTo: "system",
              priority: "medium",
            },
          },
        });
      }
    } catch (error) {
      console.error("Error sending system maintenance notifications:", error);
    }
  }
}

module.exports = NotificationTriggers;
