# DDD - CQRS

## Overview

This repo related to DDD course at udemy [DDD Udemy Course](https://www.udemy.com/course/practical-domain-driven-design/learn/lecture/50688007?start=0) just to practice what already studied at the course
There a quick chat with chatGPT to get more familiar with the task and some useful Q&A [check it out](https://chatgpt.com/share/6a282632-19d8-83ea-b7a9-5a5c736dbbc3)

## DDD NestJS Assignment - Ride Booking Platform

### Objective

Build a simplified Ride Booking backend using NestJS while applying Domain-Driven Design (DDD) principles, tactical patterns, and clean architectural boundaries.

### Business Domain

A customer can:

1. Register an account
2. Login
3. View profile
4. Request a ride
5. Confirm a ride
6. Cancel a ride
7. View ride details
8. View ride history

### Bounded Contexts

#### Identity Context

- Customer registration
- Authentication
- Customer profile

#### Ride Booking Context

- Ride requests
- Ride lifecycle management
- Fare handling

### APIs / Use Cases

#### Identity

- POST /api/v1/customers
- POST /api/v1/auth/login
- GET /api/v1/customers/me

#### Ride Booking

- POST /api/v1/rides
- POST /api/v1/rides/{rideId}/confirm
- POST /api/v1/rides/{rideId}/cancel
- GET /api/v1/rides/{rideId}
- GET /api/v1/rides

### Application Layer

Commands:

- RegisterCustomer
- RequestRide
- ConfirmRide
- CancelRide

Queries:

- LoginCustomer
- GetProfile
- GetRideDetails (Single ride)
- GetRideHistory (List rides)

### Aggregates

#### Customer

Properties:

- id
- name
- email
- passwordHash
- status

Behaviors:

- register()
- activate()
- deactivate()

#### Ride

Properties:

- id
- customerId
- pickupLocation
- dropoffLocation
- fareEstimate
- status

Behaviors:

- create()
- confirm()
- cancel()

### Value Objects

- Email
- Money
  - Greater than 0 amount
  - Currency must be within [GBP|USD|EUR]
- Location
  - Line address shouldn't exceed 200 character
  - Lng must be valid between -180 to 180
  - Lat must be valid between -90 to 90

### Repositories

- CustomerRepo
  - save (Events at outbox)
  - findById
  - findByEmail
- RideRepo
  - save (Events at outbox)
  - findById
  - listByCustomerId

**HINT: Interfaces will be at application layer and implementation at infrastructure layer**

### Domain Events

- CustomerRegisteredEvent(customerId, email)
- RideRequestedEvent(customerId, rideId)
- RideConfirmedEvent(rideId)
- RideCancelledEvent(rideId)

### Architecture Rules

- No NestJS decorators inside Domain Layer
- No Prisma/TypeORM inside Domain Layer
- Repositories used only by Application Layer
- Controllers contain no business logic
- Aggregates enforce invariants
- Domain Events originate from aggregates
- Value Objects are immutable

### Suggested Folder Structure

```text
src
├── shared
├── identity
│   ├── domain
│   ├── application
│   ├── infrastructure
│   └── presentation
├── ride-booking
│   ├── domain
│   ├── application
│   ├── infrastructure
│   └── presentation
└── main.ts
```

**Sample for application use case**

```text
Application
├── commands
│   ├── register-customer
│   │   ├── register-customer.command.ts
│   │   └── register-customer.handler.ts
│   │
│   ├── request-ride
│   │   ├── request-ride.command.ts
│   │   └── request-ride.handler.ts
│
└── queries
    ├── get-profile
    │   ├── get-profile.query.ts
    │   └── get-profile.handler.ts
    │
    └── ride-history
        ├── ride-history.query.ts
        └── ride-history.handler.ts
```

### Success Criteria

Demonstrate practical DDD implementation in NestJS with clear separation between Domain, Application, Infrastructure, and Presentation layers.

### The Rules Want To Remember

**When designing aggregates ask:**

"Can this behavior be executed without talking to external systems?"
If the answer is no, it usually does not belong inside the aggregate

**Aggregates do not persist themselves.**

Aggregates change state.
Application Services persist state

---

**Flow**

```text
Controller
      ↓
Application Service
      ↓
Repository.find()
      ↓
Aggregate.process()
      ↓
Repository.save()
```

---

**Aggregate Needs Data From Database**

1. Case 1, Load Aggregate Before Action

```ts
const order = await orderRepository.findById(id);

order.complete();
```

2. Case 2, Need Another Aggregate

requirement: customer must be active to complete order

```ts
// Command at app layer
async execute(command) {
  const order =
    await orderRepository.findById(id);

  const customer =
    await customerRepository.findById(
      order.customerId,
    );

  order.complete(customer.isActive());
}
// Aggregate
complete(customerIsActive: boolean) {
  if (!customerIsActive) {
    throw new CustomerNotActiveException();
  }

  this.status = COMPLETED;
}
```

3. Case 3, Complex Cross-Aggregate Rule
   requirement: Customer can have at most 3 active orders.

```ts
// Domain Service, e.g.
class OrderLimitChecker {
  canCreateOrder(activeOrdersCount: number): boolean {
    return activeOrdersCount < 3;
  }
}

// App service
const activeOrders = await orderRepository.countActiveOrders(customerId);

if (!orderLimitChecker.canCreateOrder(activeOrders)) {
  throw new OrderLimitExceededException();
}
```

---

**Think of an Aggregate as:**

```text
A rich business object
  NOT
a service
  NOT
a repository
  NOT
a database model

Its responsibility is:

  Protect invariants
  Execute business behavior
  Raise domain events

Its responsibility is NOT:

  Persist data
  Send emails
  Call APIs
  Read databases
  Publish Kafka messages
  Generate JWTs

DDD aims
Controller
    ↓
Application Service / Command Handler
    ↓
Repository
    ↓
Aggregate
    ↓
Repository
```

The aggregate sits in the middle as the business decision maker, not as the orchestrator.
