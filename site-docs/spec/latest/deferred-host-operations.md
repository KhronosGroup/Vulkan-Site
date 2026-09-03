# Deferred Host Operations

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_KHR_deferred_host_operations/deferred_host_operations.html

## Table of Contents

- [Requesting Deferral](#deferred-host-operations-requesting)
- [Deferred Host Operations API](#_deferred_host_operations_api)
- [Deferred_Host_Operations_API](#_deferred_host_operations_api)

## Content

Certain Vulkan commands are inherently expensive for the host CPU to
execute.
It is often desirable to offload such work onto background threads, and to
parallelize the work across multiple CPUs.
The concept of *deferred operations* allows applications and drivers to
coordinate the execution of expensive host commands using an
application-managed thread pool.

The `[VK_KHR_deferred_host_operations](../../appendices/extensions.html#VK_KHR_deferred_host_operations)` extension defines the
infrastructure and usage patterns for *deferrable commands*, but does not
specify any commands as deferrable.
This is left to additional dependent extensions.
Commands **must** not be deferred unless the deferral is specifically allowed
by another extension which depends on
`[VK_KHR_deferred_host_operations](../../appendices/extensions.html#VK_KHR_deferred_host_operations)`.
This specification will refer to such extensions as *deferral extensions*.

When an application requests an operation deferral, the implementation **may**
defer the operation.
When deferral is requested and the implementation defers any operation, the
implementation **must** return [VK_OPERATION_DEFERRED_KHR](../fundamentals.html#VkResult) as the success
code if no errors occurred.
When deferral is requested, the implementation **should** defer the operation
when the workload is significant, however if the implementation chooses not
to defer any of the requested operations and instead executes all of them
immediately, the implementation **must** return
[VK_OPERATION_NOT_DEFERRED_KHR](../fundamentals.html#VkResult) as the success code if no errors
occurred.

A deferred operation is created *complete* with an initial result value of
[VK_SUCCESS](../fundamentals.html#VkResult).
The deferred operation becomes *pending* when an operation has been
successfully deferred with that deferred operation object.

A deferred operation is considered pending until the deferred operation
completes.
A pending deferred operation becomes *complete* when it has been fully
executed by one or more threads.
Pending deferred operations will never complete until they are *joined* by
an application thread, using [vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR).
Applications **can** join multiple threads to the same deferred operation,
enabling concurrent execution of subtasks within that operation.

The application **can** query the status of a [VkDeferredOperationKHR](#VkDeferredOperationKHR)
using the [vkGetDeferredOperationMaxConcurrencyKHR](#vkGetDeferredOperationMaxConcurrencyKHR) or
[vkGetDeferredOperationResultKHR](#vkGetDeferredOperationResultKHR) commands.

Parameters to the command requesting a deferred operation **may** be accessed
by the implementation at any time until the deferred operation enters the
complete state.
The application **must** obey the following rules while a deferred operation is
pending:

* 
Externally synchronized parameters **must** not be accessed.

* 
Pointer parameters **must** not be modified (e.g. reallocated/freed).

* 
The contents of pointer parameters which **may** be read by the command
**must** not be modified.

* 
The contents of pointer parameters which **may** be written by the command
**must** not be read.

* 
Vulkan object parameters **must** not be passed as externally synchronized
parameters to any other command.

When the deferred operation is complete, the application **should** call
[vkGetDeferredOperationResultKHR](#vkGetDeferredOperationResultKHR) to obtain the [VkResult](../fundamentals.html#VkResult)
indicating success or failure of the operation.
The [VkResult](../fundamentals.html#VkResult) value returned will be one of the values that the command
requesting the deferred operation is able to return.
Writes to output parameters of the requesting command will happen-before the
deferred operation is complete.

When a deferral is requested for a command, the implementation **may** perform
memory management operations on the allocator supplied to
[vkCreateDeferredOperationKHR](#vkCreateDeferredOperationKHR) for the deferred operation object, as
described in the [Memory Allocation](../memory.html#memory-allocation) chapter.
Such allocations **must** occur on the thread which requests deferral.

If an allocator was supplied for the deferred command at the time of the
deferral request, then the implementation **may** perform memory management
operations on this allocator during the execution of
[vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR).
These operations **may** occur concurrently and **may** be performed by any joined
thread.
The application **must** ensure that the supplied allocator is able to operate
correctly under these conditions.

The `VkDeferredOperationKHR` handle is defined as:

// Provided by VK_KHR_deferred_host_operations
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDeferredOperationKHR)

This handle refers to a tracking structure which manages the execution state
for a deferred command.

To construct the tracking object for a deferred command, call:

// Provided by VK_KHR_deferred_host_operations
VkResult vkCreateDeferredOperationKHR(
    VkDevice                                    device,
    const VkAllocationCallbacks*                pAllocator,
    VkDeferredOperationKHR*                     pDeferredOperation);

* 
`device` is the device which owns `operation`.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pDeferredOperation` is a pointer to a handle in which the created
[VkDeferredOperationKHR](#VkDeferredOperationKHR) is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateDeferredOperationKHR-device-parameter) VUID-vkCreateDeferredOperationKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateDeferredOperationKHR-pAllocator-parameter) VUID-vkCreateDeferredOperationKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateDeferredOperationKHR-pDeferredOperation-parameter) VUID-vkCreateDeferredOperationKHR-pDeferredOperation-parameter

 `pDeferredOperation` **must** be a valid pointer to a [VkDeferredOperationKHR](#VkDeferredOperationKHR) handle

* 
[](#VUID-vkCreateDeferredOperationKHR-device-queuecount) VUID-vkCreateDeferredOperationKHR-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To assign a thread to a deferred operation, call:

// Provided by VK_KHR_deferred_host_operations
VkResult vkDeferredOperationJoinKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      operation);

* 
`device` is the device which owns `operation`.

* 
`operation` is the deferred operation that the calling thread should
work on.

The `vkDeferredOperationJoinKHR` command will execute a portion of the
deferred operation on the calling thread.

The return value will be one of the following:

* 
A return value of [VK_SUCCESS](../fundamentals.html#VkResult) indicates that `operation` is
complete.
The application **should** use [vkGetDeferredOperationResultKHR](#vkGetDeferredOperationResultKHR) to
retrieve the result of `operation`.

* 
A return value of [VK_THREAD_DONE_KHR](../fundamentals.html#VkResult) indicates that the deferred
operation is not complete, but there is no work remaining to assign to
threads.
Future calls to [vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR) are not necessary and
will simply harm performance.
This situation **may** occur when other threads executing
[vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR) are about to complete `operation`,
and the implementation is unable to partition the workload any further.

* 
A return value of [VK_THREAD_IDLE_KHR](../fundamentals.html#VkResult) indicates that the deferred
operation is not complete, and there is no work for the thread to do at
the time of the call.
This situation **may** occur if the operation encounters a temporary
reduction in parallelism.
By returning [VK_THREAD_IDLE_KHR](../fundamentals.html#VkResult), the implementation is signaling
that it expects that more opportunities for parallelism will emerge as
execution progresses, and that future calls to
[vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR) **can** be beneficial.
In the meantime, the application **can** perform other work on the calling
thread.

Implementations **must** guarantee forward progress by enforcing the following
invariants:

If only one thread has invoked [vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR) on a
given operation, that thread **must** execute the operation to completion
and return [VK_SUCCESS](../fundamentals.html#VkResult).

If multiple threads have concurrently invoked
[vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR) on the same operation, then at least
one of them **must** complete the operation and return [VK_SUCCESS](../fundamentals.html#VkResult).

Valid Usage (Implicit)

* 
[](#VUID-vkDeferredOperationJoinKHR-device-parameter) VUID-vkDeferredOperationJoinKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDeferredOperationJoinKHR-operation-parameter) VUID-vkDeferredOperationJoinKHR-operation-parameter

 `operation` **must** be a valid [VkDeferredOperationKHR](#VkDeferredOperationKHR) handle

* 
[](#VUID-vkDeferredOperationJoinKHR-operation-parent) VUID-vkDeferredOperationJoinKHR-operation-parent

 `operation` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

* 
[VK_THREAD_DONE_KHR](../fundamentals.html#VkResult)

* 
[VK_THREAD_IDLE_KHR](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

When a deferred operation is completed, the application **can** destroy the
tracking object by calling:

// Provided by VK_KHR_deferred_host_operations
void vkDestroyDeferredOperationKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      operation,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the device which owns `operation`.

* 
`operation` is the completed operation to be destroyed.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-03434) VUID-vkDestroyDeferredOperationKHR-operation-03434

If `VkAllocationCallbacks` were provided when `operation` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-03435) VUID-vkDestroyDeferredOperationKHR-operation-03435

If no `VkAllocationCallbacks` were provided when `operation` was
created, `pAllocator` **must** be `NULL`

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-03436) VUID-vkDestroyDeferredOperationKHR-operation-03436

`operation` **must** be completed

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDeferredOperationKHR-device-parameter) VUID-vkDestroyDeferredOperationKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-parameter) VUID-vkDestroyDeferredOperationKHR-operation-parameter

 If `operation` is not [VK_NULL_HANDLE](../../appendices/boilerplate.html#VK_NULL_HANDLE), `operation` **must** be a valid [VkDeferredOperationKHR](#VkDeferredOperationKHR) handle

* 
[](#VUID-vkDestroyDeferredOperationKHR-pAllocator-parameter) VUID-vkDestroyDeferredOperationKHR-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyDeferredOperationKHR-operation-parent) VUID-vkDestroyDeferredOperationKHR-operation-parent

 If `operation` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `operation` **must** be externally synchronized

To query the number of additional threads that can usefully be joined to a
deferred operation, call:

// Provided by VK_KHR_deferred_host_operations
uint32_t vkGetDeferredOperationMaxConcurrencyKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      operation);

* 
`device` is the device which owns `operation`.

* 
`operation` is the deferred operation to be queried.

The returned value is the maximum number of threads that can usefully
execute a deferred operation concurrently, reported for the state of the
deferred operation at the point this command is called.
This value is intended to be used to better schedule work onto available
threads.
Applications **can** join any number of threads to the deferred operation and
expect it to eventually complete, though excessive joins **may** return
[VK_THREAD_DONE_KHR](../fundamentals.html#VkResult) immediately, performing no useful work.

If `operation` is complete,
`vkGetDeferredOperationMaxConcurrencyKHR` returns zero.

If `operation` is currently joined to any threads, the value returned by
this command **may** immediately be out of date.

If `operation` is pending, implementations **must** not return zero unless
at least one thread is currently executing [vkDeferredOperationJoinKHR](#vkDeferredOperationJoinKHR)
on `operation`.
If there are such threads, the implementation **should** return an estimate of
the number of additional threads which it could profitably use.

Implementations **may** return 232-1 to indicate that the maximum
concurrency is unknown and cannot be easily derived.
Implementations **may** return values larger than the maximum concurrency
available on the host CPU.
In these situations, an application **should** clamp the return value rather
than oversubscribing the machine.

|  | The recommended usage pattern for applications is to query this value once,
| --- | --- |
after deferral, and schedule no more than the specified number of threads to
join the operation.
Each time a joined thread receives [VK_THREAD_IDLE_KHR](../fundamentals.html#VkResult), the application
should schedule an additional join at some point in the future, but is not
required to do so. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeferredOperationMaxConcurrencyKHR-device-parameter) VUID-vkGetDeferredOperationMaxConcurrencyKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeferredOperationMaxConcurrencyKHR-operation-parameter) VUID-vkGetDeferredOperationMaxConcurrencyKHR-operation-parameter

 `operation` **must** be a valid [VkDeferredOperationKHR](#VkDeferredOperationKHR) handle

* 
[](#VUID-vkGetDeferredOperationMaxConcurrencyKHR-operation-parent) VUID-vkGetDeferredOperationMaxConcurrencyKHR-operation-parent

 `operation` **must** have been created, allocated, or retrieved from `device`

The `vkGetDeferredOperationResultKHR` function is defined as:

// Provided by VK_KHR_deferred_host_operations
VkResult vkGetDeferredOperationResultKHR(
    VkDevice                                    device,
    VkDeferredOperationKHR                      operation);

* 
`device` is the device which owns `operation`.

* 
`operation` is the operation whose deferred result is being queried.

If no command has been deferred on `operation`,
`vkGetDeferredOperationResultKHR` returns [VK_SUCCESS](../fundamentals.html#VkResult).

If the deferred operation is pending, `vkGetDeferredOperationResultKHR`
returns [VK_NOT_READY](../fundamentals.html#VkResult).

If the deferred operation is complete, it returns the appropriate return
value from the original command.
This value **must** be one of the [VkResult](../fundamentals.html#VkResult) values which could have been
returned by the original command if the operation had not been deferred.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeferredOperationResultKHR-device-parameter) VUID-vkGetDeferredOperationResultKHR-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeferredOperationResultKHR-operation-parameter) VUID-vkGetDeferredOperationResultKHR-operation-parameter

 `operation` **must** be a valid [VkDeferredOperationKHR](#VkDeferredOperationKHR) handle

* 
[](#VUID-vkGetDeferredOperationResultKHR-operation-parent) VUID-vkGetDeferredOperationResultKHR-operation-parent

 `operation` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](../fundamentals.html#VkResult)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)
