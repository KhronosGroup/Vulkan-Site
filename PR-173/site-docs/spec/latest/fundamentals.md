# Fundamentals

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/fundamentals.html

## Table of Contents

- [Host and Device Environment](#fundamentals-host-environment)
- [Host_and_Device_Environment](#fundamentals-host-environment)
- [Execution Model](#fundamentals-execmodel)
- [Queue Operation](#fundamentals-queueoperation)
- [Object Model](#fundamentals-objectmodel-overview)
- [Object Lifetime](#fundamentals-objectmodel-lifetime)
- [External Object Handles](#fundamentals-objectmodel-external)
- [External_Object_Handles](#fundamentals-objectmodel-external)
- [Application Binary Interface](#fundamentals-abi)
- [Application_Binary_Interface](#fundamentals-abi)
- [Command Syntax and Duration](#fundamentals-commandsyntax)
- [Command_Syntax_and_Duration](#fundamentals-commandsyntax)
- [Lifetime of Retrieved Results](#fundamentals-commandsyntax-results-lifetime)
- [Lifetime_of_Retrieved_Results](#fundamentals-commandsyntax-results-lifetime)
- [Array Results](#fundamentals-commandsyntax-array-results)
- [Opaque Binary Data Results](#fundamentals-binaryresults)
- [Opaque_Binary_Data_Results](#fundamentals-binaryresults)
- [Threading Behavior](#fundamentals-threadingbehavior)
- [Valid Usage](#fundamentals-validusage)
- [Usage Validation](#fundamentals-validation)
- [Implicit Valid Usage](#fundamentals-implicit-validity)
- [Implicit_Valid_Usage](#fundamentals-implicit-validity)
- [Valid Usage for Object Handles](#fundamentals-validusage-handles)
- [Valid_Usage_for_Object_Handles](#fundamentals-validusage-handles)
- [Valid Usage for Pointers](#fundamentals-validusage-pointers)
- [Valid_Usage_for_Pointers](#fundamentals-validusage-pointers)
- [Valid Usage for Strings](#fundamentals-validusage-strings)
- [Valid_Usage_for_Strings](#fundamentals-validusage-strings)
- [Valid Usage for Enumerated Types](#fundamentals-validusage-enums)
- [Valid_Usage_for_Enumerated_Types](#fundamentals-validusage-enums)
- [Valid Usage for Flags](#fundamentals-validusage-flags)
- [Valid_Usage_for_Flags](#fundamentals-validusage-flags)
- [Valid Usage for Structure Types](#fundamentals-validusage-sType)
- [Valid_Usage_for_Structure_Types](#fundamentals-validusage-sType)
- [Valid Usage for Structure Pointer Chains](#fundamentals-validusage-pNext)
- [Valid_Usage_for_Structure_Pointer_Chains](#fundamentals-validusage-pNext)
- [Valid Usage for Nested Structures](#fundamentals-validusage-nested-structs)
- [Valid_Usage_for_Nested_Structures](#fundamentals-validusage-nested-structs)
- [Valid Usage for Extensions](#fundamentals-validusage-extensions)
- [Valid_Usage_for_Extensions](#fundamentals-validusage-extensions)
- [Valid Usage for Newer Core Versions](#fundamentals-validusage-versions)
- [Valid_Usage_for_Newer_Core_Versions](#fundamentals-validusage-versions)
- [VkResult Return Codes](#fundamentals-returncodes)
- [VkResult_Return_Codes](#fundamentals-returncodes)
- [Numeric Representation and Computation](#fundamentals-numerics)
- [Numeric_Representation_and_Computation](#fundamentals-numerics)
- [Floating-Point Computation](#fundamentals-floating-point)
- [Floating-Point Format Conversions](#fundamentals-fp-conversion)
- [Floating-Point_Format_Conversions](#fundamentals-fp-conversion)
- [16-Bit Floating-Point Numbers](#fundamentals-fp16)
- [16-Bit_Floating-Point_Numbers](#fundamentals-fp16)
- [Unsigned 11-Bit Floating-Point Numbers](#fundamentals-fp11)
- [Unsigned_11-Bit_Floating-Point_Numbers](#fundamentals-fp11)
- [Unsigned 10-Bit Floating-Point Numbers](#fundamentals-fp10)
- [Unsigned_10-Bit_Floating-Point_Numbers](#fundamentals-fp10)
- [8-bit booleans](#fundamentals-bool)
- [General Requirements](#fundamentals-general)
- [Fixed-Point Data Conversions](#fundamentals-fixedconv)
- [Fixed-Point_Data_Conversions](#fundamentals-fixedconv)
- [Conversion From Normalized Fixed-Point to Floating-Point](#fundamentals-fixedfpconv)
- [Conversion_From_Normalized_Fixed-Point_to_Floating-Point](#fundamentals-fixedfpconv)
- [Conversion From Floating-Point to Normalized Fixed-Point](#fundamentals-fpfixedconv)
- [Conversion_From_Floating-Point_to_Normalized_Fixed-Point](#fundamentals-fpfixedconv)
- [String Representation](#fundamentals-strings)
- [Common Object Types](#fundamentals-common-objects)
- [Common_Object_Types](#fundamentals-common-objects)
- [Offsets](#_offsets)
- [Extents](#_extents)
- [Rectangles](#_rectangles)
- [Host Address Ranges](#_host_address_ranges)
- [Host_Address_Ranges](#_host_address_ranges)
- [Device Address Ranges](#_device_address_ranges)
- [Device_Address_Ranges](#_device_address_ranges)
- [Structure Types](#_structure_types)
- [API Name Aliases](#fundamentals-api-name-aliases)
- [API_Name_Aliases](#fundamentals-api-name-aliases)

## Content

This chapter introduces fundamental concepts including the Vulkan
architecture and execution model, API syntax, queues, pipeline
configurations, numeric representation, state and state queries, and the
different types of objects and shaders.
It provides a framework for interpreting more specific descriptions of
commands and behavior in the remainder of the Specification.

The Vulkan Specification assumes and requires: the following properties of
the host environment with respect to Vulkan implementations:

* 
The host **must** have runtime support for 8-, 16-, 32-, and 64-bit signed
and unsigned twos-complement integers, all addressable at the
granularity of their size in bytes.

* 
The host **must** have runtime support for 32- and 64-bit floating-point
types satisfying the range and precision constraints in the
[Floating-Point Computation](#fundamentals-floating-point) section.

* 
The representation and endianness of these types on the host **must** match
the representation and endianness of the same types on every physical
device supported.

|  | Since a variety of data types and structures in Vulkan **may** be accessible by
| --- | --- |
both host and physical device operations, the implementation **should** be able
to access such data efficiently in both paths in order to facilitate writing
portable and performant applications. |

This section outlines the execution model of a Vulkan system.

Vulkan exposes one or more *devices*, each of which exposes one or more
*queues* which **may** process work asynchronously to one another.
The set of queues supported by a device is partitioned into *families*.
Each family supports one or more types of functionality and **may** contain
multiple queues with similar characteristics.
Queues within a single family are considered *compatible* with one another,
and work produced for a family of queues **can** be executed on any queue
within that family.
This specification defines the following types of functionality that queues
**may** support: graphics, compute,
video decode,
video encode,
protected memory management,
sparse memory management,
and transfer.

|  | A single device **may** report multiple similar queue families rather than, or
| --- | --- |
as well as, reporting multiple members of one or more of those families.
This indicates that while members of those families have similar
capabilities, they are *not* directly compatible with one another. |

Device memory is explicitly managed by the application.
Each device **may** advertise one or more heaps, representing different areas
of memory.
Memory heaps are either device-local or host-local, but are always visible
to the device.
Further detail about memory heaps is exposed via memory types available on
that heap.
Examples of memory areas that **may** be available on an implementation
include:

* 
*device-local* is memory that is physically connected to the device.

* 
*device-local, host visible* is device-local memory that is visible to
the host.

* 
*host-local, host visible* is memory that is local to the host and
visible to the device and host.

On other architectures, there **may** only be a single heap that **can** be used
for any purpose.

Each device supports a number of [queues](devsandqueues.html#devsandqueues-queues), which
provide an interface for [submitting work](devsandqueues.html#devsandqueues-submission) for
execution on the device.

[*Queue submission commands*](devsandqueues.html#devsandqueues-submission) are used to submit
work, along with a set of [synchronization primitives](synchronization.html#synchronization)
used to constrain the order of submitted operations.
Queues are intended for asynchronous execution of submitted workloads, and
queue submission commands **should** return as soon as the work has been
submitted, without waiting for the work to complete.
Once submitted to a queue, work will begin and complete execution without
further application intervention.

There are no implicit ordering constraints between queue operations on
different queues, or between queues and the host, so these **may** operate in
any order with respect to each other.
Explicit ordering constraints between different queues or with the host **can**
be expressed with [semaphores](synchronization.html#synchronization-semaphores) and
[fences](synchronization.html#synchronization-fences).

Many commands for queues are recorded into [*command buffers*](cmdbuffers.html#commandbuffers) first, before the command buffers are then submitted to a queue
for execution.
Command buffer submissions to a single queue respect
[submission order](synchronization.html#synchronization-submission-order) and other
[implicit ordering guarantees](synchronization.html#synchronization-implicit), but otherwise
**may** overlap or execute out of order.
Other types of batches and queue submissions against a single queue
(e.g. [sparse memory binding](sparsemem.html#sparsemem-memory-binding))
have no implicit ordering constraints with any other queue submission or
batch.
Additional explicit ordering constraints between queue submissions and
individual batches can be expressed with
[semaphores](synchronization.html#synchronization-semaphores) and
[fences](synchronization.html#synchronization-fences).

Before a fence or semaphore is signaled, it is guaranteed that any
previously submitted queue operations have completed execution, and that
memory writes from those queue operations are
[available](synchronization.html#synchronization-dependencies-available-and-visible) to future
queue operations.
Waiting on a signaled semaphore or fence guarantees that previous writes
that are available are also
[visible](synchronization.html#synchronization-dependencies-available-and-visible) to subsequent
commands.

Command buffer boundaries, both between primary command buffers of the same
or different batches or submissions as well as between primary and secondary
command buffers, do not introduce any additional ordering constraints.
In other words, submitting the set of command buffers (which **can** include
executing secondary command buffers) between any semaphore or fence
operations execute the recorded commands as if they had all been recorded
into a single primary command buffer, except that the current state is
[reset](cmdbuffers.html#commandbuffers-statereset) on each boundary.
Explicit ordering constraints **can** be expressed with [explicit synchronization primitives](synchronization.html#synchronization).

There are a few [implicit ordering guarantees](synchronization.html#synchronization-implicit)
between commands within a command buffer, but only covering a subset of
execution.
Additional explicit ordering constraints can be expressed with the various
[explicit synchronization primitives](synchronization.html#synchronization).

|  | Implementations have significant freedom to overlap execution of work
| --- | --- |
submitted to a queue, and this is common due to deep pipelining and
parallelism in Vulkan devices. |

Commands recorded in command buffers can perform actions, set state that
persists across commands, synchronize other commands, or indirectly launch
other commands, with some commands fulfilling several of these roles.
The “Command Properties” section for each such command lists which of
these roles the command takes:

Action

*Action commands* perform operations that can update values in memory.
E.g. [draw commands](drawing.html#drawing), [dispatch commands](dispatch.html#dispatch).

State

*State setting commands* update the current state of a command buffer,
affecting the operation of future action commands.

Synchronization

*Synchronization commands* impose ordering constraints on action commands,
by introducing explicit [execution and  memory dependencies](synchronization.html#synchronization-dependencies).

Indirection

*Indirection commands* execute other commands which were not directly
recorded in the same command buffer.

|  | In the absence of explicit synchronization or [implicit ordering guarantees](synchronization.html#synchronization-implicit), action commands may overlap execution or
| --- | --- |
execute out of order, potentially leading to data races.
However, such reordering does not affect the current state observed by any
action command.
Each action command uses the state in effect at the point where the command
occurs in the command buffer, regardless of when it is executed. |

The devices, queues, and other entities in Vulkan are represented by Vulkan
objects.
At the API level, all objects are referred to by handles.
There are two classes of handles: dispatchable and non-dispatchable.
*Dispatchable* handle types are a pointer to an opaque type.
This pointer **may** be used by layers as part of intercepting API commands,
and thus each API command takes a dispatchable type as its first parameter.
Each object of a dispatchable type **must** have a unique handle value during
its lifetime.

*Non-dispatchable* handle types are a 64-bit integer type whose meaning is
implementation-dependent.
If the [`privateData`](features.html#features-privateData) feature is enabled for a
[VkDevice](devsandqueues.html#VkDevice), each object of a non-dispatchable type created on that
device **must** have a handle value that is unique among objects created on
that device, for the duration of the object’s lifetime.
Otherwise, non-dispatchable
handles **may** encode object information directly in the handle rather than
acting as a reference to an underlying object, and thus **may** not have unique
handle values.
If handle values are not unique, then destroying one such handle **must** not
cause identical handles of other types to become invalid, and **must** not
cause identical handles of the same type to become invalid if that handle
value has been created more times than it has been destroyed.

All objects created or allocated from a `VkDevice` (i.e. with a
`VkDevice` as the first parameter) are private to that device, and **must**
not be used on other devices.

Objects are created or allocated by `vkCreate*` and `vkAllocate*`
commands, respectively.
Once an object is created or allocated, its “structure” is considered to
be immutable, though the content of certain object types is still free to
change.
When an object is passed to another command, it **may** be accessed by the
implementation, which **may** include both read and write access unless
explicitly stated otherwise.
Objects are destroyed or freed by `vkDestroy*` and `vkFree*`
commands, respectively.

Objects that are allocated (rather than created) take resources from an
existing pool object or memory heap, and when freed return resources to that
pool or heap.
While object creation and destruction are generally expected to be
low-frequency occurrences during runtime, allocating and freeing objects
**can** occur at high frequency.
Pool objects help accommodate improved performance of the allocations and
frees.

Applications are responsible for managing the lifetimes of Vulkan objects
and memory passed into the Vulkan API.
The access semantics of different functions in the API follow a typical
pattern as laid out below, with any exceptions listed with the commands or
objects that have them.

Application-owned memory and Vulkan objects **may** be accessed at any time
during the execution of a command they are passed to.
Vulkan objects that device addresses are retrieved from **may** be accessed by
the implementation any time that memory backing the device address is
accessed.
Device addresses and
Vulkan objects passed in during the creation or allocation of another object
**may** be accessed by the implementation any time that the created/allocated
object is accessed unless explicitly stated otherwise.
Device addresses and
Vulkan objects passed to a recording command (`vkCmd*`) **may** be accessed
at any time during the execution of the command, when the command buffer is
subsequently recorded into another command buffer, during any subsequent
command that is recorded to either the command buffer or one it is recorded
into, or while the command buffer is in the [*pending state*](cmdbuffers.html#commandbuffers-lifecycle), unless explicitly stated otherwise.
If an application is using [deferred host operations](VK_KHR_deferred_host_operations/deferred_host_operations.html#deferred-host-operations) in a command, and that operation is successfully deferred,
objects and memory passed to that command **may** be accessed at any time until
the deferred operation is complete.
Some additional operations hold references to other objects or
application-owned memory beyond the duration of the command; in which case
the access semantics and lifetime of those references are described by that
command.

When destroying or freeing an object, implementations **must** not access any
memory or other objects that **may** otherwise be accessed when the object is
accessed.
Applications **can** free or destroy objects in any order, except that parent
objects **must** be freed only after all child objects are freed.
An object is the parent of another child object if the parent was used as
the first object parameter in the creation of the child.
Once an object is freed or destroyed it **must** not be accessed again, either
directly or via access through another object.
Applications **must** not free or destroy any object while it is being
accessed.

As defined above, the scope of object handles created or allocated from a
`VkDevice` is limited to that logical device.
Objects which are not in scope are said to be external.
To bring an external object into scope, an external handle **must** be exported
from the object in the source scope and imported into the destination scope.

|  | The scope of external handles and their associated resources **may** vary
| --- | --- |
according to their type, but they **can** generally be shared across process
and API boundaries. |

The mechanism by which Vulkan is made available to applications is platform-
or implementation- defined.
On many platforms the C interface described in this Specification is
provided by a shared library.
Since shared libraries can be changed independently of the applications that
use them, they present particular compatibility challenges, and this
Specification places some requirements on them.

Shared library implementations **must** use the default Application Binary
Interface (ABI) of the standard C compiler for the platform, or provide
customized API headers that cause application code to use the
implementation’s non-default ABI.
An ABI in this context means the size, alignment, and layout of C data
types; the procedure calling convention; and the naming convention for
shared library symbols corresponding to C functions.
Customizing the calling convention for a platform is usually accomplished by
defining [calling convention macros](../appendices/boilerplate.html#boilerplate-platform-specific-calling-conventions) appropriately in `vk_platform.h`.

On platforms where Vulkan is provided as a shared library, library symbols
beginning with “vk” and followed by a digit or uppercase letter are
reserved for use by the implementation.
Applications which use Vulkan **must** not provide definitions of these
symbols.
This allows the Vulkan shared library to be updated with additional symbols
for new API versions or extensions without causing symbol conflicts with
existing applications.

Shared library implementations **should** provide library symbols for commands
in the highest version of this Specification they support, and for
[Window System Integration](VK_KHR_surface/wsi.html#wsi)
extensions relevant to the platform.
They **may** also provide library symbols for commands defined by additional
extensions.

|  | These requirements and recommendations are intended to allow implementors to
| --- | --- |
take advantage of platform-specific conventions for SDKs, ABIs, library
versioning mechanisms, etc.
while still minimizing the code changes necessary to port applications or
libraries between platforms.
Platform vendors, or providers of the *de facto* standard Vulkan shared
library for a platform, are encouraged to document what symbols the shared
library provides and how it will be versioned when new symbols are added.

Applications **should** only rely on shared library symbols for commands in the
minimum core version required by the application.
[vkGetInstanceProcAddr](initialization.html#vkGetInstanceProcAddr) and [vkGetDeviceProcAddr](initialization.html#vkGetDeviceProcAddr) **should** be used to
obtain function pointers for commands in core versions beyond the
application’s minimum required version. |

The Specification describes Vulkan commands as functions or procedures using
C99 syntax.
Language bindings for other languages such as C++ and JavaScript **may** allow
for stricter parameter passing, or object-oriented interfaces.

Vulkan uses the standard C types for the base type of scalar parameters
(e.g. types from ``), with exceptions described below, or
elsewhere in the text when appropriate:

`VkBool32` represents boolean `True` and `False` values, since C does
not have a sufficiently portable built-in boolean type:

// Provided by VK_VERSION_1_0
typedef uint32_t VkBool32;

[VK_TRUE](#VK_TRUE) represents a boolean **True** (unsigned integer 1) value, and
[VK_FALSE](#VK_FALSE) a boolean **False** (unsigned integer 0) value.

All values returned from a Vulkan implementation in a `VkBool32` will
be either [VK_TRUE](#VK_TRUE) or [VK_FALSE](#VK_FALSE).

Applications **must** not pass any other values than [VK_TRUE](#VK_TRUE) or
[VK_FALSE](#VK_FALSE) into a Vulkan implementation where a `VkBool32` is
expected.

[VK_TRUE](#VK_TRUE) is a constant representing a `VkBool32` **True** value.

#define VK_TRUE                           1U

[VK_FALSE](#VK_FALSE) is a constant representing a `VkBool32` **False** value.

#define VK_FALSE                          0U

`VkDeviceSize` represents device memory size and offset values:

// Provided by VK_VERSION_1_0
typedef uint64_t VkDeviceSize;

`VkDeviceAddress` represents device buffer address values:

// Provided by VK_VERSION_1_0
typedef uint64_t VkDeviceAddress;

Valid Usage

* 
[](#VUID-VkDeviceAddress-size-11364) VUID-VkDeviceAddress-size-11364

A valid `VkDeviceAddress` **must** be equal to the sum of an address
retrieved from a [VkBuffer](resources.html#VkBuffer) via [vkGetBufferDeviceAddress](resources.html#vkGetBufferDeviceAddress), and
any offset in the range [0, `size`), where `size` is the
value of [VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`size` used to create that
[VkBuffer](resources.html#VkBuffer)

* 
[](#VUID-VkDeviceAddress-None-10894) VUID-VkDeviceAddress-None-10894

If a `VkDeviceAddress` was retrieved from a non-sparse buffer,
that buffer **must** be bound completely and contiguously to a single
`VkDeviceMemory` object

Commands that create Vulkan objects are of the form `vkCreate*` and take
`Vk*CreateInfo` structures with the parameters needed to create the
object.
These Vulkan objects are destroyed with commands of the form
`vkDestroy*`.

The last in-parameter to each command that creates or destroys a Vulkan
object is `pAllocator`.
The `pAllocator` parameter **can** be a non-`NULL` value, in which case
allocations for the given object are delegated to an application provided
callback.
Refer to the [Memory Allocation](memory.html#memory-allocation) chapter for further
details.

Commands that allocate Vulkan objects owned by pool objects are of the form
`vkAllocate*`, and take `Vk*AllocateInfo` structures.
These Vulkan objects are freed with commands of the form `vkFree*`.
These objects do not take allocators; if host memory is needed, they will
use the allocator that was specified when their parent pool was created.

Commands are recorded into a command buffer by calling API commands of the
form `vkCmd*`.
Each such command **may** have different restrictions on where it **can** be used:
in a primary and/or secondary command buffer, inside and/or outside a render
pass, and in one or more of the supported queue types.
These restrictions are documented together with the definition of each such
command.

The *duration* of a Vulkan command refers to the interval between calling
the command and its return to the caller.

Information is retrieved from the implementation with commands of the form
`vkGet*` and `vkEnumerate*`.

Unless otherwise specified for an individual command, the results are
*invariant*; that is, they will remain unchanged when retrieved again by
calling the same command with the same parameters, so long as those
parameters themselves all remain valid.

Some query commands of the form `vkGet*` and `vkEnumerate*` enable
retrieving multiple results in the form of a return array.
Such commands typically have two pointer arguments as follows:

* 
An element count pointer pointing to an integer variable, conventionally
named as `p*Count` where `*` is the capitalized singular form of
the name of the retrieved values.

* 
A pointer to an array where the result array is retrieved,
conventionally named as `p*` where `*` is the capitalized plural
form of the name of the retrieved values.

If such commands are called with the array pointer set to `NULL`, then the
number of retrievable elements is returned in the variable pointed to by the
element count pointer.
Otherwise, the element count pointer **must** point to a variable set by the
application to the number of elements in the return array, and on return the
variable is overwritten with the number of elements actually written to the
return array.
If the input element count is less than the number of retrievable array
elements, the query will write only as many elements to the return array as
specified by the element count variable set by the application, and the
command will return [VK_INCOMPLETE](#VkResult) instead of [VK_SUCCESS](#VkResult), to
indicate that not all retrievable array elements were returned.

|  | In practice, this means that applications will typically call such query
| --- | --- |
commands twice:

* 
First, with the array pointer set to `NULL`, to retrieve the number of
retrievable elements.

* 
Second, with the array pointer pointing to an application allocated
storage for at least as many elements as indicated by the variable
pointed to by the element count pointer, to retrieve at most as many of
the retrievable elements. |

Query commands that return one or more structures, regardless of whether
they return a single or an array of structures with or without a `pNext`
chain, **may** also contain arrays within those structures.
Such return arrays are typically defined in the form of two members as
follows:

* 
An integer value specifying the element count, conventionally named as
`*Count` where `*` is the singular form of the name of the
retrieved values.

* 
A pointer to an array where the result array is retrieved,
conventionally named as `p*` where `*` is the capitalized plural
form of the name of the retrieved values.

Analogously to query commands that return multiple results, if the command
is called with the array pointer member of the output structure in question
set to `NULL`, then the number of retrievable elements is returned in the
element count member of that output structure.
Otherwise, the element count **must** specify the number of elements in the
return array, and on return the element count member is overwritten with the
number of elements actually written to the return array.
If the input element count is less than the number of retrievable array
elements, the query will write only as many elements to the return array as
specified by the input element count, and the command will return
[VK_INCOMPLETE](#VkResult) instead of [VK_SUCCESS](#VkResult), if the query command has a
[VkResult](#VkResult) return type, to indicate that not all retrievable array
elements were returned.

|  | Applications need to separately track the value they provided as the input
| --- | --- |
element count member for such arrays and compare those with the returned
element counts in order to determine whether the actually returned element
count is smaller than the size of the return array.
Another side effect of this is that it is impossible for the application to
determine if the number of retrievable elements has increased beyond the
provided input element count so using return arrays in output structures
**should** be limited to *invariant* array results.
In practice, this means that applications will typically call such query
commands multiple times:

* 
First, with the array pointer member(s) set to `NULL`, to retrieve the
number(s) of retrievable elements.

* 
Second, with the array pointer(s) pointing to an application allocated
storage for at least as many elements as indicated by the element count
member(s), to retrieve at most as many of the retrievable elements.

* 
Then the process **may** need to be repeated for all other newly introduced
return arrays in any nested output structures indirectly specified
through the previously retrieved result arrays. |

Regardless of the type of query command, any array pointer member of an
output structure **must** either be `NULL`, or point to an
application-allocated array.
Query commands **must** not return a pointer to implementation allocated
storage in any output structure.

Some query commands of the form `vkGet*` retrieve opaque binary data in
the form of a byte array and have a possible result code of
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](#VkResult).
Such commands always have two pointer arguments as follows:

* 
A binary data size pointer pointing to a `size_t` variable,
conventionally named as `p*Size` where `*` is the capitalized
form of the name of the retrieved binary data.

* 
A pointer to a byte array where the binary data is retrieved,
conventionally named as `p*` where `*` is the capitalized form
of the name of the retrieved binary data.

If such commands are called with the binary pointer not set to `NULL`, the
binary size pointer **must** point to a variable set by the application to the
allocated size of the binary pointer.
These arguments **may** also be placed in an extensible structure, in which
case the binary data size argument is not a pointer.

If the input binary size is less than the total retrievable binary size, the
query will not write any data to the location pointed to the binary pointer,
and the command will return [VK_ERROR_NOT_ENOUGH_SPACE_KHR](#VkResult) instead of
[VK_SUCCESS](#VkResult).

If the return code is [VK_SUCCESS](#VkResult) or
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](#VkResult), the total size of the binary data that
**can** be retrieved is returned in the variable pointed to by the binary size
pointer.

If multiple binaries are being retrieved,
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](#VkResult) will be returned if any input binary
sizes are less than their respective total retrievable binary sizes.
Unless otherwise specified, this command will determine writing data to each
binary individually based on if their input binary sizes are sufficiently
sized, following the behavior for single binary retrieval.

For all other error codes, the contents of the return structures are
**undefined**.

|  | If [VK_ERROR_NOT_ENOUGH_SPACE_KHR](#VkResult) is returned with a command that
| --- | --- |
returns multiple binaries, the application **can** determine which binaries are
undersized by comparing the total binary size that is returned for each
binary against the allocated size that was provided to the command. |

|  | Some binary queries do not behave consistently with this pattern for
| --- | --- |
historical reasons, primarily that the [VK_ERROR_NOT_ENOUGH_SPACE_KHR](#VkResult)
error code was not defined until after those queries were written.

A NOTE is added to each such query, describing such inconsistent behavior. |

Vulkan is intended to provide scalable performance when used on multiple
host threads.
All commands support being called concurrently from multiple threads, but
certain parameters, or components of parameters are defined to be
*externally synchronized*.
This means that the caller **must** guarantee that no more than one thread is
using such a parameter at a given time.

More precisely, Vulkan commands use simple stores to update the state of
Vulkan objects.
The implementation **may** not synchronize accesses to memory parameters or
object parameters declared as externally synchronized with other accesses.
If two commands access the same object or memory and at least one of the
commands declares the object to be externally synchronized, then the caller
**must** guarantee not only that the commands do not execute simultaneously,
but also that the two commands are separated by an appropriate memory
barrier (if needed).
Similarly, if a Vulkan command accesses a non-const memory parameter and the
application also accesses that memory, or if the application writes to that
memory and the command accesses it as a const memory parameter, the
application **must** ensure the accesses are properly synchronized with a
memory barrier if needed.

|  | Memory barriers are particularly relevant for hosts based on the ARM CPU
| --- | --- |
architecture, which is more weakly ordered than many developers are
accustomed to from x86/x64 programming.
Fortunately, most higher-level synchronization primitives (like the pthread
library) perform memory barriers as a part of mutual exclusion, so mutexing
Vulkan objects via these primitives will have the desired effect. |

Any object parameters that are not labeled as externally synchronized are
either not mutated by the command or are internally synchronized.
Additionally, certain objects related to a command’s parameters (e.g.
command pools and descriptor pools) **may** be affected by a command, and **must**
also be externally synchronized.
These implicit parameters are documented as described below.

Parameters of commands that are externally synchronized are listed below.

Externally Synchronized Parameters and Members

* 
The `instance` parameter in [vkDestroyInstance](initialization.html#vkDestroyInstance)

* 
The `device` parameter in [vkDestroyDevice](devsandqueues.html#vkDestroyDevice)

* 
The `queue` parameter in [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `fence` parameter in [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit)

* 
The `queue` parameter in [vkQueueWaitIdle](synchronization.html#vkQueueWaitIdle),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `memory` parameter in [vkFreeMemory](memory.html#vkFreeMemory)

* 
The `memory` parameter in [vkMapMemory](memory.html#vkMapMemory)

* 
The `memory` parameter in [vkUnmapMemory](memory.html#vkUnmapMemory)

* 
The `buffer` parameter in [vkBindBufferMemory](resources.html#vkBindBufferMemory)

* 
The `image` parameter in [vkBindImageMemory](resources.html#vkBindImageMemory)

* 
The `queue` parameter in [vkQueueBindSparse](sparsemem.html#vkQueueBindSparse),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `fence` parameter in [vkQueueBindSparse](sparsemem.html#vkQueueBindSparse)

* 
The `fence` parameter in [vkDestroyFence](synchronization.html#vkDestroyFence)

* 
The `semaphore` parameter in [vkDestroySemaphore](synchronization.html#vkDestroySemaphore)

* 
The `queryPool` parameter in [vkDestroyQueryPool](queries.html#vkDestroyQueryPool)

* 
The `buffer` parameter in [vkDestroyBuffer](resources.html#vkDestroyBuffer)

* 
The `image` parameter in [vkDestroyImage](resources.html#vkDestroyImage)

* 
The `imageView` parameter in [vkDestroyImageView](resources.html#vkDestroyImageView)

* 
The `commandPool` parameter in [vkDestroyCommandPool](cmdbuffers.html#vkDestroyCommandPool)

* 
The `commandPool` parameter in [vkResetCommandPool](cmdbuffers.html#vkResetCommandPool)

* 
The `commandPool` parameter in [vkFreeCommandBuffers](cmdbuffers.html#vkFreeCommandBuffers)

* 
The `commandBuffer` parameter in [vkBeginCommandBuffer](cmdbuffers.html#vkBeginCommandBuffer)

* 
The `commandBuffer` parameter in [vkEndCommandBuffer](cmdbuffers.html#vkEndCommandBuffer)

* 
The `commandBuffer` parameter in [vkResetCommandBuffer](cmdbuffers.html#vkResetCommandBuffer)

* 
The `commandBuffer` parameter in [vkCmdCopyBuffer](copies.html#vkCmdCopyBuffer)

* 
The `commandBuffer` parameter in [vkCmdCopyImage](copies.html#vkCmdCopyImage)

* 
The `commandBuffer` parameter in [vkCmdCopyBufferToImage](copies.html#vkCmdCopyBufferToImage)

* 
The `commandBuffer` parameter in [vkCmdCopyImageToBuffer](copies.html#vkCmdCopyImageToBuffer)

* 
The `commandBuffer` parameter in [vkCmdUpdateBuffer](clears.html#vkCmdUpdateBuffer)

* 
The `commandBuffer` parameter in [vkCmdFillBuffer](clears.html#vkCmdFillBuffer)

* 
The `commandBuffer` parameter in [vkCmdPipelineBarrier](synchronization.html#vkCmdPipelineBarrier)

* 
The `commandBuffer` parameter in [vkCmdBeginQuery](queries.html#vkCmdBeginQuery)

* 
The `commandBuffer` parameter in [vkCmdEndQuery](queries.html#vkCmdEndQuery)

* 
The `commandBuffer` parameter in [vkCmdResetQueryPool](queries.html#vkCmdResetQueryPool)

* 
The `commandBuffer` parameter in [vkCmdWriteTimestamp](queries.html#vkCmdWriteTimestamp)

* 
The `commandBuffer` parameter in [vkCmdCopyQueryPoolResults](queries.html#vkCmdCopyQueryPoolResults)

* 
The `commandBuffer` parameter in [vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands)

* 
The `event` parameter in [vkDestroyEvent](synchronization.html#vkDestroyEvent)

* 
The `event` parameter in [vkSetEvent](synchronization.html#vkSetEvent)

* 
The `event` parameter in [vkResetEvent](synchronization.html#vkResetEvent)

* 
The `bufferView` parameter in [vkDestroyBufferView](resources.html#vkDestroyBufferView)

* 
The `shaderModule` parameter in [vkDestroyShaderModule](shaders.html#vkDestroyShaderModule)

* 
The `pipelineCache` parameter in [vkDestroyPipelineCache](pipelines.html#vkDestroyPipelineCache)

* 
The `dstCache` parameter in [vkMergePipelineCaches](pipelines.html#vkMergePipelineCaches), conditionally1

* 
The `pipelineCache` parameter in [vkCreateComputePipelines](pipelines.html#vkCreateComputePipelines), conditionally1

* 
The `pipeline` parameter in [vkDestroyPipeline](pipelines.html#vkDestroyPipeline)

* 
The `pipelineLayout` parameter in [vkDestroyPipelineLayout](descriptorsets.html#vkDestroyPipelineLayout)

* 
The `sampler` parameter in [vkDestroySampler](samplers.html#vkDestroySampler)

* 
The `descriptorSetLayout` parameter in [vkDestroyDescriptorSetLayout](descriptorsets.html#vkDestroyDescriptorSetLayout)

* 
The `descriptorPool` parameter in [vkDestroyDescriptorPool](descriptorsets.html#vkDestroyDescriptorPool)

* 
The `descriptorPool` parameter in [vkResetDescriptorPool](descriptorsets.html#vkResetDescriptorPool)

* 
The `descriptorPool` parameter in [vkFreeDescriptorSets](descriptorsets.html#vkFreeDescriptorSets)

* 
The `commandBuffer` parameter in [vkCmdBindPipeline](pipelines.html#vkCmdBindPipeline)

* 
The `commandBuffer` parameter in [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets)

* 
The `commandBuffer` parameter in [vkCmdClearColorImage](clears.html#vkCmdClearColorImage)

* 
The `commandBuffer` parameter in [vkCmdDispatch](dispatch.html#vkCmdDispatch)

* 
The `commandBuffer` parameter in [vkCmdDispatchIndirect](dispatch.html#vkCmdDispatchIndirect)

* 
The `commandBuffer` parameter in [vkCmdSetEvent](synchronization.html#vkCmdSetEvent)

* 
The `commandBuffer` parameter in [vkCmdResetEvent](synchronization.html#vkCmdResetEvent)

* 
The `commandBuffer` parameter in [vkCmdWaitEvents](synchronization.html#vkCmdWaitEvents)

* 
The `commandBuffer` parameter in [vkCmdPushConstants](descriptorsets.html#vkCmdPushConstants)

* 
The `pipelineCache` parameter in [vkCreateGraphicsPipelines](pipelines.html#vkCreateGraphicsPipelines), conditionally1

* 
The `framebuffer` parameter in [vkDestroyFramebuffer](renderpass.html#vkDestroyFramebuffer)

* 
The `renderPass` parameter in [vkDestroyRenderPass](renderpass.html#vkDestroyRenderPass)

* 
The `commandBuffer` parameter in [vkCmdSetViewport](vertexpostproc.html#vkCmdSetViewport)

* 
The `commandBuffer` parameter in [vkCmdSetScissor](fragops.html#vkCmdSetScissor)

* 
The `commandBuffer` parameter in [vkCmdSetLineWidth](primsrast.html#vkCmdSetLineWidth)

* 
The `commandBuffer` parameter in [vkCmdSetDepthBias](primsrast.html#vkCmdSetDepthBias)

* 
The `commandBuffer` parameter in [vkCmdSetBlendConstants](framebuffer.html#vkCmdSetBlendConstants)

* 
The `commandBuffer` parameter in [vkCmdSetDepthBounds](fragops.html#vkCmdSetDepthBounds)

* 
The `commandBuffer` parameter in [vkCmdSetStencilCompareMask](fragops.html#vkCmdSetStencilCompareMask)

* 
The `commandBuffer` parameter in [vkCmdSetStencilWriteMask](fragops.html#vkCmdSetStencilWriteMask)

* 
The `commandBuffer` parameter in [vkCmdSetStencilReference](fragops.html#vkCmdSetStencilReference)

* 
The `commandBuffer` parameter in [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer)

* 
The `commandBuffer` parameter in [vkCmdBindVertexBuffers](fxvertex.html#vkCmdBindVertexBuffers)

* 
The `commandBuffer` parameter in [vkCmdDraw](drawing.html#vkCmdDraw)

* 
The `commandBuffer` parameter in [vkCmdDrawIndexed](drawing.html#vkCmdDrawIndexed)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect)

* 
The `commandBuffer` parameter in [vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect)

* 
The `commandBuffer` parameter in [vkCmdBlitImage](copies.html#vkCmdBlitImage)

* 
The `commandBuffer` parameter in [vkCmdClearDepthStencilImage](clears.html#vkCmdClearDepthStencilImage)

* 
The `commandBuffer` parameter in [vkCmdClearAttachments](clears.html#vkCmdClearAttachments)

* 
The `commandBuffer` parameter in [vkCmdResolveImage](copies.html#vkCmdResolveImage)

* 
The `commandBuffer` parameter in [vkCmdBeginRenderPass](renderpass.html#vkCmdBeginRenderPass)

* 
The `commandBuffer` parameter in [vkCmdNextSubpass](renderpass.html#vkCmdNextSubpass)

* 
The `commandBuffer` parameter in [vkCmdEndRenderPass](renderpass.html#vkCmdEndRenderPass)

* 
The `commandBuffer` parameter in [vkCmdSetDeviceMask](cmdbuffers.html#vkCmdSetDeviceMask)

* 
The `commandPool` parameter in [vkTrimCommandPool](cmdbuffers.html#vkTrimCommandPool)

* 
The `commandBuffer` parameter in [vkCmdDispatchBase](dispatch.html#vkCmdDispatchBase)

* 
The `descriptorUpdateTemplate` parameter in [vkDestroyDescriptorUpdateTemplate](descriptorsets.html#vkDestroyDescriptorUpdateTemplate)

* 
The `descriptorSet` parameter in [vkUpdateDescriptorSetWithTemplate](descriptorsets.html#vkUpdateDescriptorSetWithTemplate), conditionally1

* 
The `ycbcrConversion` parameter in [vkDestroySamplerYcbcrConversion](samplers.html#vkDestroySamplerYcbcrConversion)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirectCount](drawing.html#vkCmdDrawIndirectCount)

* 
The `commandBuffer` parameter in [vkCmdDrawIndexedIndirectCount](drawing.html#vkCmdDrawIndexedIndirectCount)

* 
The `commandBuffer` parameter in [vkCmdBeginRenderPass2](renderpass.html#vkCmdBeginRenderPass2)

* 
The `commandBuffer` parameter in [vkCmdNextSubpass2](renderpass.html#vkCmdNextSubpass2)

* 
The `commandBuffer` parameter in [vkCmdEndRenderPass2](renderpass.html#vkCmdEndRenderPass2)

* 
The `privateDataSlot` parameter in [vkDestroyPrivateDataSlot](private_data.html#vkDestroyPrivateDataSlot)

* 
The `commandBuffer` parameter in [vkCmdPipelineBarrier2](synchronization.html#vkCmdPipelineBarrier2)

* 
The `commandBuffer` parameter in [vkCmdWriteTimestamp2](queries.html#vkCmdWriteTimestamp2)

* 
The `queue` parameter in [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `fence` parameter in [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2)

* 
The `commandBuffer` parameter in [vkCmdCopyBuffer2](copies.html#vkCmdCopyBuffer2)

* 
The `commandBuffer` parameter in [vkCmdCopyImage2](copies.html#vkCmdCopyImage2)

* 
The `commandBuffer` parameter in [vkCmdCopyBufferToImage2](copies.html#vkCmdCopyBufferToImage2)

* 
The `commandBuffer` parameter in [vkCmdCopyImageToBuffer2](copies.html#vkCmdCopyImageToBuffer2)

* 
The `commandBuffer` parameter in [vkCmdSetEvent2](synchronization.html#vkCmdSetEvent2)

* 
The `commandBuffer` parameter in [vkCmdResetEvent2](synchronization.html#vkCmdResetEvent2)

* 
The `commandBuffer` parameter in [vkCmdWaitEvents2](synchronization.html#vkCmdWaitEvents2)

* 
The `commandBuffer` parameter in [vkCmdBlitImage2](copies.html#vkCmdBlitImage2)

* 
The `commandBuffer` parameter in [vkCmdResolveImage2](copies.html#vkCmdResolveImage2)

* 
The `commandBuffer` parameter in [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)

* 
The `commandBuffer` parameter in [vkCmdEndRendering](renderpass.html#vkCmdEndRendering)

* 
The `commandBuffer` parameter in [vkCmdSetCullMode](primsrast.html#vkCmdSetCullMode)

* 
The `commandBuffer` parameter in [vkCmdSetFrontFace](primsrast.html#vkCmdSetFrontFace)

* 
The `commandBuffer` parameter in [vkCmdSetPrimitiveTopology](drawing.html#vkCmdSetPrimitiveTopology)

* 
The `commandBuffer` parameter in [vkCmdSetViewportWithCount](vertexpostproc.html#vkCmdSetViewportWithCount)

* 
The `commandBuffer` parameter in [vkCmdSetScissorWithCount](vertexpostproc.html#vkCmdSetScissorWithCount)

* 
The `commandBuffer` parameter in [vkCmdBindVertexBuffers2](fxvertex.html#vkCmdBindVertexBuffers2)

* 
The `commandBuffer` parameter in [vkCmdSetDepthTestEnable](fragops.html#vkCmdSetDepthTestEnable)

* 
The `commandBuffer` parameter in [vkCmdSetDepthWriteEnable](fragops.html#vkCmdSetDepthWriteEnable)

* 
The `commandBuffer` parameter in [vkCmdSetDepthCompareOp](fragops.html#vkCmdSetDepthCompareOp)

* 
The `commandBuffer` parameter in [vkCmdSetDepthBoundsTestEnable](fragops.html#vkCmdSetDepthBoundsTestEnable)

* 
The `commandBuffer` parameter in [vkCmdSetStencilTestEnable](fragops.html#vkCmdSetStencilTestEnable)

* 
The `commandBuffer` parameter in [vkCmdSetStencilOp](fragops.html#vkCmdSetStencilOp)

* 
The `commandBuffer` parameter in [vkCmdSetRasterizerDiscardEnable](primsrast.html#vkCmdSetRasterizerDiscardEnable)

* 
The `commandBuffer` parameter in [vkCmdSetDepthBiasEnable](primsrast.html#vkCmdSetDepthBiasEnable)

* 
The `commandBuffer` parameter in [vkCmdSetPrimitiveRestartEnable](drawing.html#vkCmdSetPrimitiveRestartEnable)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSet](descriptorsets.html#vkCmdPushDescriptorSet)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSetWithTemplate](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate)

* 
The `commandBuffer` parameter in [vkCmdBindDescriptorSets2](descriptorsets.html#vkCmdBindDescriptorSets2)

* 
The `commandBuffer` parameter in [vkCmdPushConstants2](descriptorsets.html#vkCmdPushConstants2)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSet2](descriptorsets.html#vkCmdPushDescriptorSet2)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSetWithTemplate2](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate2)

* 
The `commandBuffer` parameter in [vkCmdSetLineStipple](primsrast.html#vkCmdSetLineStipple)

* 
The `commandBuffer` parameter in [vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2)

* 
The `commandBuffer` parameter in [vkCmdSetRenderingAttachmentLocations](interfaces.html#vkCmdSetRenderingAttachmentLocations)

* 
The `commandBuffer` parameter in [vkCmdSetRenderingInputAttachmentIndices](interfaces.html#vkCmdSetRenderingInputAttachmentIndices)

* 
The `surface` parameter in [vkDestroySurfaceKHR](VK_KHR_surface/wsi.html#vkDestroySurfaceKHR)

* 
The `swapchain` parameter in [vkDestroySwapchainKHR](VK_KHR_surface/wsi.html#vkDestroySwapchainKHR)

* 
The `swapchain` parameter in [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR)

* 
The `semaphore` parameter in [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR)

* 
The `fence` parameter in [vkAcquireNextImageKHR](VK_KHR_surface/wsi.html#vkAcquireNextImageKHR)

* 
The `queue` parameter in [vkQueuePresentKHR](VK_KHR_surface/wsi.html#vkQueuePresentKHR),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `surface` parameter in [vkGetDeviceGroupSurfacePresentModesKHR](VK_KHR_surface/wsi.html#vkGetDeviceGroupSurfacePresentModesKHR)

* 
The `surface` parameter in [vkGetPhysicalDevicePresentRectanglesKHR](VK_KHR_surface/wsi.html#vkGetPhysicalDevicePresentRectanglesKHR)

* 
The `display` parameter in [vkCreateDisplayModeKHR](VK_KHR_surface/wsi.html#vkCreateDisplayModeKHR)

* 
The `mode` parameter in [vkGetDisplayPlaneCapabilitiesKHR](VK_KHR_surface/wsi.html#vkGetDisplayPlaneCapabilitiesKHR)

* 
The `videoSession` parameter in [vkDestroyVideoSessionKHR](videocoding.html#vkDestroyVideoSessionKHR)

* 
The `videoSession` parameter in [vkBindVideoSessionMemoryKHR](videocoding.html#vkBindVideoSessionMemoryKHR)

* 
The `videoSessionParameters` parameter in [vkDestroyVideoSessionParametersKHR](videocoding.html#vkDestroyVideoSessionParametersKHR)

* 
The `commandBuffer` parameter in [vkCmdBeginVideoCodingKHR](videocoding.html#vkCmdBeginVideoCodingKHR)

* 
The `commandBuffer` parameter in [vkCmdEndVideoCodingKHR](videocoding.html#vkCmdEndVideoCodingKHR)

* 
The `commandBuffer` parameter in [vkCmdControlVideoCodingKHR](videocoding.html#vkCmdControlVideoCodingKHR)

* 
The `commandBuffer` parameter in [vkCmdDecodeVideoKHR](videocoding.html#vkCmdDecodeVideoKHR)

* 
The `commandBuffer` parameter in [vkCmdBeginRenderingKHR](renderpass.html#vkCmdBeginRenderingKHR)

* 
The `commandBuffer` parameter in [vkCmdEndRenderingKHR](renderpass.html#vkCmdEndRenderingKHR)

* 
The `commandBuffer` parameter in [vkCmdSetDeviceMaskKHR](cmdbuffers.html#vkCmdSetDeviceMaskKHR)

* 
The `commandBuffer` parameter in [vkCmdDispatchBaseKHR](dispatch.html#vkCmdDispatchBaseKHR)

* 
The `commandPool` parameter in [vkTrimCommandPoolKHR](cmdbuffers.html#vkTrimCommandPoolKHR)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSetKHR](descriptorsets.html#vkCmdPushDescriptorSetKHR)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSetWithTemplateKHR](descriptorsets.html#vkCmdPushDescriptorSetWithTemplateKHR)

* 
The `descriptorUpdateTemplate` parameter in [vkDestroyDescriptorUpdateTemplateKHR](descriptorsets.html#vkDestroyDescriptorUpdateTemplateKHR)

* 
The `descriptorSet` parameter in [vkUpdateDescriptorSetWithTemplateKHR](descriptorsets.html#vkUpdateDescriptorSetWithTemplateKHR), conditionally1

* 
The `commandBuffer` parameter in [vkCmdBeginRenderPass2KHR](renderpass.html#vkCmdBeginRenderPass2KHR)

* 
The `commandBuffer` parameter in [vkCmdNextSubpass2KHR](renderpass.html#vkCmdNextSubpass2KHR)

* 
The `commandBuffer` parameter in [vkCmdEndRenderPass2KHR](renderpass.html#vkCmdEndRenderPass2KHR)

* 
The `swapchain` parameter in [vkGetSwapchainStatusKHR](VK_KHR_surface/wsi.html#vkGetSwapchainStatusKHR)

* 
The `ycbcrConversion` parameter in [vkDestroySamplerYcbcrConversionKHR](samplers.html#vkDestroySamplerYcbcrConversionKHR)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirectCountKHR](drawing.html#vkCmdDrawIndirectCountKHR)

* 
The `commandBuffer` parameter in [vkCmdDrawIndexedIndirectCountKHR](drawing.html#vkCmdDrawIndexedIndirectCountKHR)

* 
The `commandBuffer` parameter in [vkCmdSetFragmentShadingRateKHR](primsrast.html#vkCmdSetFragmentShadingRateKHR)

* 
The `commandBuffer` parameter in [vkCmdSetRenderingAttachmentLocationsKHR](interfaces.html#vkCmdSetRenderingAttachmentLocationsKHR)

* 
The `commandBuffer` parameter in [vkCmdSetRenderingInputAttachmentIndicesKHR](interfaces.html#vkCmdSetRenderingInputAttachmentIndicesKHR)

* 
The `swapchain` parameter in [vkWaitForPresentKHR](VK_KHR_surface/wsi.html#vkWaitForPresentKHR)

* 
The `operation` parameter in [vkDestroyDeferredOperationKHR](VK_KHR_deferred_host_operations/deferred_host_operations.html#vkDestroyDeferredOperationKHR)

* 
The `commandBuffer` parameter in [vkCmdEncodeVideoKHR](videocoding.html#vkCmdEncodeVideoKHR)

* 
The `commandBuffer` parameter in [vkCmdSetEvent2KHR](synchronization.html#vkCmdSetEvent2KHR)

* 
The `commandBuffer` parameter in [vkCmdResetEvent2KHR](synchronization.html#vkCmdResetEvent2KHR)

* 
The `commandBuffer` parameter in [vkCmdWaitEvents2KHR](synchronization.html#vkCmdWaitEvents2KHR)

* 
The `commandBuffer` parameter in [vkCmdPipelineBarrier2KHR](synchronization.html#vkCmdPipelineBarrier2KHR)

* 
The `commandBuffer` parameter in [vkCmdWriteTimestamp2KHR](queries.html#vkCmdWriteTimestamp2KHR)

* 
The `queue` parameter in [vkQueueSubmit2KHR](cmdbuffers.html#vkQueueSubmit2KHR),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `fence` parameter in [vkQueueSubmit2KHR](cmdbuffers.html#vkQueueSubmit2KHR)

* 
The `commandBuffer` parameter in [vkCmdBindIndexBuffer3KHR](drawing.html#vkCmdBindIndexBuffer3KHR)

* 
The `commandBuffer` parameter in [vkCmdBindVertexBuffers3KHR](fxvertex.html#vkCmdBindVertexBuffers3KHR)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirect2KHR](drawing.html#vkCmdDrawIndirect2KHR)

* 
The `commandBuffer` parameter in [vkCmdDrawIndexedIndirect2KHR](drawing.html#vkCmdDrawIndexedIndirect2KHR)

* 
The `commandBuffer` parameter in [vkCmdDispatchIndirect2KHR](dispatch.html#vkCmdDispatchIndirect2KHR)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryKHR](copies.html#vkCmdCopyMemoryKHR)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryToImageKHR](copies.html#vkCmdCopyMemoryToImageKHR)

* 
The `commandBuffer` parameter in [vkCmdCopyImageToMemoryKHR](copies.html#vkCmdCopyImageToMemoryKHR)

* 
The `commandBuffer` parameter in [vkCmdUpdateMemoryKHR](clears.html#vkCmdUpdateMemoryKHR)

* 
The `commandBuffer` parameter in [vkCmdFillMemoryKHR](clears.html#vkCmdFillMemoryKHR)

* 
The `commandBuffer` parameter in [vkCmdCopyQueryPoolResultsToMemoryKHR](queries.html#vkCmdCopyQueryPoolResultsToMemoryKHR)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirectCount2KHR](drawing.html#vkCmdDrawIndirectCount2KHR)

* 
The `commandBuffer` parameter in [vkCmdDrawIndexedIndirectCount2KHR](drawing.html#vkCmdDrawIndexedIndirectCount2KHR)

* 
The `commandBuffer` parameter in [vkCmdBeginConditionalRendering2EXT](drawing.html#vkCmdBeginConditionalRendering2EXT)

* 
The `commandBuffer` parameter in [vkCmdBindTransformFeedbackBuffers2EXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffers2EXT)

* 
The `commandBuffer` parameter in [vkCmdBeginTransformFeedback2EXT](vertexpostproc.html#vkCmdBeginTransformFeedback2EXT)

* 
The `commandBuffer` parameter in [vkCmdEndTransformFeedback2EXT](vertexpostproc.html#vkCmdEndTransformFeedback2EXT)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirectByteCount2EXT](drawing.html#vkCmdDrawIndirectByteCount2EXT)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksIndirect2EXT](drawing.html#vkCmdDrawMeshTasksIndirect2EXT)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksIndirectCount2EXT](drawing.html#vkCmdDrawMeshTasksIndirectCount2EXT)

* 
The `commandBuffer` parameter in [vkCmdWriteMarkerToMemoryAMD](copies.html#vkCmdWriteMarkerToMemoryAMD)

* 
The `commandBuffer` parameter in [vkCmdCopyBuffer2KHR](copies.html#vkCmdCopyBuffer2KHR)

* 
The `commandBuffer` parameter in [vkCmdCopyImage2KHR](copies.html#vkCmdCopyImage2KHR)

* 
The `commandBuffer` parameter in [vkCmdCopyBufferToImage2KHR](copies.html#vkCmdCopyBufferToImage2KHR)

* 
The `commandBuffer` parameter in [vkCmdCopyImageToBuffer2KHR](copies.html#vkCmdCopyImageToBuffer2KHR)

* 
The `commandBuffer` parameter in [vkCmdBlitImage2KHR](copies.html#vkCmdBlitImage2KHR)

* 
The `commandBuffer` parameter in [vkCmdResolveImage2KHR](copies.html#vkCmdResolveImage2KHR)

* 
The `commandBuffer` parameter in [vkCmdTraceRaysIndirect2KHR](raytracing.html#vkCmdTraceRaysIndirect2KHR)

* 
The `commandBuffer` parameter in [vkCmdBindIndexBuffer2KHR](drawing.html#vkCmdBindIndexBuffer2KHR)

* 
The `swapchain` parameter in [vkWaitForPresent2KHR](VK_KHR_surface/wsi.html#vkWaitForPresent2KHR)

* 
The `pipelineBinary` parameter in [vkDestroyPipelineBinaryKHR](pipelines.html#vkDestroyPipelineBinaryKHR)

* 
The `commandBuffer` parameter in [vkCmdSetLineStippleKHR](primsrast.html#vkCmdSetLineStippleKHR)

* 
The `commandBuffer` parameter in [vkCmdBindDescriptorSets2KHR](descriptorsets.html#vkCmdBindDescriptorSets2KHR)

* 
The `commandBuffer` parameter in [vkCmdPushConstants2KHR](descriptorsets.html#vkCmdPushConstants2KHR)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSet2KHR](descriptorsets.html#vkCmdPushDescriptorSet2KHR)

* 
The `commandBuffer` parameter in [vkCmdPushDescriptorSetWithTemplate2KHR](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate2KHR)

* 
The `commandBuffer` parameter in [vkCmdSetDescriptorBufferOffsets2EXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsets2EXT)

* 
The `commandBuffer` parameter in [vkCmdBindDescriptorBufferEmbeddedSamplers2EXT](descriptorsets.html#vkCmdBindDescriptorBufferEmbeddedSamplers2EXT)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryIndirectKHR](copies.html#vkCmdCopyMemoryIndirectKHR)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryToImageIndirectKHR](copies.html#vkCmdCopyMemoryToImageIndirectKHR)

* 
The `commandBuffer` parameter in [vkCmdEndRendering2KHR](renderpass.html#vkCmdEndRendering2KHR)

* 
The `callback` parameter in [vkDestroyDebugReportCallbackEXT](debugging.html#vkDestroyDebugReportCallbackEXT)

* 
The `commandBuffer` parameter in [vkCmdDebugMarkerBeginEXT](debugging.html#vkCmdDebugMarkerBeginEXT)

* 
The `commandBuffer` parameter in [vkCmdDebugMarkerEndEXT](debugging.html#vkCmdDebugMarkerEndEXT)

* 
The `commandBuffer` parameter in [vkCmdDebugMarkerInsertEXT](debugging.html#vkCmdDebugMarkerInsertEXT)

* 
The `commandBuffer` parameter in [vkCmdBindTransformFeedbackBuffersEXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffersEXT)

* 
The `commandBuffer` parameter in [vkCmdBeginTransformFeedbackEXT](vertexpostproc.html#vkCmdBeginTransformFeedbackEXT)

* 
The `commandBuffer` parameter in [vkCmdEndTransformFeedbackEXT](vertexpostproc.html#vkCmdEndTransformFeedbackEXT)

* 
The `commandBuffer` parameter in [vkCmdBeginQueryIndexedEXT](queries.html#vkCmdBeginQueryIndexedEXT)

* 
The `commandBuffer` parameter in [vkCmdEndQueryIndexedEXT](queries.html#vkCmdEndQueryIndexedEXT)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirectByteCountEXT](drawing.html#vkCmdDrawIndirectByteCountEXT)

* 
The `commandBuffer` parameter in [vkCmdDrawIndirectCountAMD](drawing.html#vkCmdDrawIndirectCountAMD)

* 
The `commandBuffer` parameter in [vkCmdDrawIndexedIndirectCountAMD](drawing.html#vkCmdDrawIndexedIndirectCountAMD)

* 
The `commandBuffer` parameter in [vkCmdBeginConditionalRenderingEXT](drawing.html#vkCmdBeginConditionalRenderingEXT)

* 
The `commandBuffer` parameter in [vkCmdEndConditionalRenderingEXT](drawing.html#vkCmdEndConditionalRenderingEXT)

* 
The `commandBuffer` parameter in [vkCmdSetViewportWScalingNV](vertexpostproc.html#vkCmdSetViewportWScalingNV)

* 
The `swapchain` parameter in [vkGetRefreshCycleDurationGOOGLE](VK_KHR_surface/wsi.html#vkGetRefreshCycleDurationGOOGLE)

* 
The `swapchain` parameter in [vkGetPastPresentationTimingGOOGLE](VK_KHR_surface/wsi.html#vkGetPastPresentationTimingGOOGLE)

* 
The `commandBuffer` parameter in [vkCmdSetDiscardRectangleEXT](fragops.html#vkCmdSetDiscardRectangleEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDiscardRectangleEnableEXT](fragops.html#vkCmdSetDiscardRectangleEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDiscardRectangleModeEXT](fragops.html#vkCmdSetDiscardRectangleModeEXT)

* 
The `objectHandle` member of the `pNameInfo` parameter in [vkSetDebugUtilsObjectNameEXT](debugging.html#vkSetDebugUtilsObjectNameEXT)

* 
The `queue` parameter in [vkQueueBeginDebugUtilsLabelEXT](debugging.html#vkQueueBeginDebugUtilsLabelEXT),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `queue` parameter in [vkQueueEndDebugUtilsLabelEXT](debugging.html#vkQueueEndDebugUtilsLabelEXT),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `queue` parameter in [vkQueueInsertDebugUtilsLabelEXT](debugging.html#vkQueueInsertDebugUtilsLabelEXT),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `commandBuffer` parameter in [vkCmdBeginDebugUtilsLabelEXT](debugging.html#vkCmdBeginDebugUtilsLabelEXT)

* 
The `commandBuffer` parameter in [vkCmdEndDebugUtilsLabelEXT](debugging.html#vkCmdEndDebugUtilsLabelEXT)

* 
The `commandBuffer` parameter in [vkCmdInsertDebugUtilsLabelEXT](debugging.html#vkCmdInsertDebugUtilsLabelEXT)

* 
The `messenger` parameter in [vkDestroyDebugUtilsMessengerEXT](debugging.html#vkDestroyDebugUtilsMessengerEXT)

* 
The `pipelineCache` parameter in [vkCreateExecutionGraphPipelinesAMDX](executiongraphs.html#vkCreateExecutionGraphPipelinesAMDX), conditionally1

* 
The `commandBuffer` parameter in [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)

* 
The `commandBuffer` parameter in [vkCmdBindResourceHeapEXT](descriptorheaps.html#vkCmdBindResourceHeapEXT)

* 
The `commandBuffer` parameter in [vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
The `commandBuffer` parameter in [vkCmdSetSampleLocationsEXT](primsrast.html#vkCmdSetSampleLocationsEXT)

* 
The `validationCache` parameter in [vkDestroyValidationCacheEXT](shaders.html#vkDestroyValidationCacheEXT)

* 
The `dstCache` parameter in [vkMergeValidationCachesEXT](shaders.html#vkMergeValidationCachesEXT)

* 
The `commandBuffer` parameter in [vkCmdBindShadingRateImageNV](primsrast.html#vkCmdBindShadingRateImageNV)

* 
The `commandBuffer` parameter in [vkCmdSetViewportShadingRatePaletteNV](primsrast.html#vkCmdSetViewportShadingRatePaletteNV)

* 
The `commandBuffer` parameter in [vkCmdSetCoarseSampleOrderNV](primsrast.html#vkCmdSetCoarseSampleOrderNV)

* 
The `accelerationStructure` parameter in [vkDestroyAccelerationStructureNV](resources.html#vkDestroyAccelerationStructureNV)

* 
The `commandBuffer` parameter in [vkCmdBuildAccelerationStructureNV](accelstructures.html#vkCmdBuildAccelerationStructureNV)

* 
The `commandBuffer` parameter in [vkCmdCopyAccelerationStructureNV](accelstructures.html#vkCmdCopyAccelerationStructureNV)

* 
The `commandBuffer` parameter in [vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV)

* 
The `pipelineCache` parameter in [vkCreateRayTracingPipelinesNV](pipelines.html#vkCreateRayTracingPipelinesNV), conditionally1

* 
The `commandBuffer` parameter in [vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV)

* 
The `commandBuffer` parameter in [vkCmdWriteBufferMarkerAMD](copies.html#vkCmdWriteBufferMarkerAMD)

* 
The `commandBuffer` parameter in [vkCmdWriteBufferMarker2AMD](copies.html#vkCmdWriteBufferMarker2AMD)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksNV](drawing.html#vkCmdDrawMeshTasksNV)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksIndirectNV](drawing.html#vkCmdDrawMeshTasksIndirectNV)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksIndirectCountNV](drawing.html#vkCmdDrawMeshTasksIndirectCountNV)

* 
The `commandBuffer` parameter in [vkCmdSetExclusiveScissorEnableNV](fragops.html#vkCmdSetExclusiveScissorEnableNV)

* 
The `commandBuffer` parameter in [vkCmdSetExclusiveScissorNV](fragops.html#vkCmdSetExclusiveScissorNV)

* 
The `commandBuffer` parameter in [vkCmdSetCheckpointNV](debugging.html#vkCmdSetCheckpointNV)

* 
The `swapchain` parameter in [vkSetSwapchainPresentTimingQueueSizeEXT](VK_KHR_surface/wsi.html#vkSetSwapchainPresentTimingQueueSizeEXT)

* 
The `swapchain` parameter in [vkGetSwapchainTimingPropertiesEXT](VK_KHR_surface/wsi.html#vkGetSwapchainTimingPropertiesEXT)

* 
The `swapchain` parameter in [vkGetSwapchainTimeDomainPropertiesEXT](VK_KHR_surface/wsi.html#vkGetSwapchainTimeDomainPropertiesEXT)

* 
The `commandBuffer` parameter in [vkCmdSetPerformanceMarkerINTEL](queries.html#vkCmdSetPerformanceMarkerINTEL)

* 
The `commandBuffer` parameter in [vkCmdSetPerformanceStreamMarkerINTEL](queries.html#vkCmdSetPerformanceStreamMarkerINTEL)

* 
The `commandBuffer` parameter in [vkCmdSetPerformanceOverrideINTEL](queries.html#vkCmdSetPerformanceOverrideINTEL)

* 
The `configuration` parameter in [vkReleasePerformanceConfigurationINTEL](queries.html#vkReleasePerformanceConfigurationINTEL)

* 
The `queue` parameter in [vkQueueSetPerformanceConfigurationINTEL](queries.html#vkQueueSetPerformanceConfigurationINTEL),
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

* 
The `commandBuffer` parameter in [vkCmdSetLineStippleEXT](primsrast.html#vkCmdSetLineStippleEXT)

* 
The `commandBuffer` parameter in [vkCmdSetCullModeEXT](primsrast.html#vkCmdSetCullModeEXT)

* 
The `commandBuffer` parameter in [vkCmdSetFrontFaceEXT](primsrast.html#vkCmdSetFrontFaceEXT)

* 
The `commandBuffer` parameter in [vkCmdSetPrimitiveTopologyEXT](drawing.html#vkCmdSetPrimitiveTopologyEXT)

* 
The `commandBuffer` parameter in [vkCmdSetViewportWithCountEXT](vertexpostproc.html#vkCmdSetViewportWithCountEXT)

* 
The `commandBuffer` parameter in [vkCmdSetScissorWithCountEXT](vertexpostproc.html#vkCmdSetScissorWithCountEXT)

* 
The `commandBuffer` parameter in [vkCmdBindVertexBuffers2EXT](fxvertex.html#vkCmdBindVertexBuffers2EXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthTestEnableEXT](fragops.html#vkCmdSetDepthTestEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthWriteEnableEXT](fragops.html#vkCmdSetDepthWriteEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthCompareOpEXT](fragops.html#vkCmdSetDepthCompareOpEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthBoundsTestEnableEXT](fragops.html#vkCmdSetDepthBoundsTestEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetStencilTestEnableEXT](fragops.html#vkCmdSetStencilTestEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetStencilOpEXT](fragops.html#vkCmdSetStencilOpEXT)

* 
The `commandBuffer` parameter in [vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV)

* 
The `commandBuffer` parameter in [vkCmdExecuteGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdExecuteGeneratedCommandsNV)

* 
The `commandBuffer` parameter in [vkCmdBindPipelineShaderGroupNV](pipelines.html#vkCmdBindPipelineShaderGroupNV)

* 
The `indirectCommandsLayout` parameter in [vkDestroyIndirectCommandsLayoutNV](device_generated_commands/generatedcommands.html#vkDestroyIndirectCommandsLayoutNV)

* 
The `commandBuffer` parameter in [vkCmdSetDepthBias2EXT](primsrast.html#vkCmdSetDepthBias2EXT)

* 
The `privateDataSlot` parameter in [vkDestroyPrivateDataSlotEXT](private_data.html#vkDestroyPrivateDataSlotEXT)

* 
The `commandBuffer` parameter in [vkCmdBindDescriptorBuffersEXT](descriptorsets.html#vkCmdBindDescriptorBuffersEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT)

* 
The `commandBuffer` parameter in [vkCmdBindDescriptorBufferEmbeddedSamplersEXT](descriptorsets.html#vkCmdBindDescriptorBufferEmbeddedSamplersEXT)

* 
The `commandBuffer` parameter in [vkCmdSetFragmentShadingRateEnumNV](primsrast.html#vkCmdSetFragmentShadingRateEnumNV)

* 
The `commandBuffer` parameter in [vkCmdSetVertexInputEXT](fxvertex.html#vkCmdSetVertexInputEXT)

* 
The `commandBuffer` parameter in [vkCmdSubpassShadingHUAWEI](dispatch.html#vkCmdSubpassShadingHUAWEI)

* 
The `commandBuffer` parameter in [vkCmdBindInvocationMaskHUAWEI](raytracing.html#vkCmdBindInvocationMaskHUAWEI)

* 
The `commandBuffer` parameter in [vkCmdSetPatchControlPointsEXT](shaders.html#vkCmdSetPatchControlPointsEXT)

* 
The `commandBuffer` parameter in [vkCmdSetRasterizerDiscardEnableEXT](primsrast.html#vkCmdSetRasterizerDiscardEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthBiasEnableEXT](primsrast.html#vkCmdSetDepthBiasEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetLogicOpEXT](framebuffer.html#vkCmdSetLogicOpEXT)

* 
The `commandBuffer` parameter in [vkCmdSetPrimitiveRestartEnableEXT](drawing.html#vkCmdSetPrimitiveRestartEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetColorWriteEnableEXT](framebuffer.html#vkCmdSetColorWriteEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdDrawMultiEXT](drawing.html#vkCmdDrawMultiEXT)

* 
The `commandBuffer` parameter in [vkCmdDrawMultiIndexedEXT](drawing.html#vkCmdDrawMultiIndexedEXT)

* 
The `micromap` parameter in [vkDestroyMicromapEXT](resources.html#vkDestroyMicromapEXT)

* 
The `commandBuffer` parameter in [vkCmdBuildMicromapsEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdBuildMicromapsEXT)

* 
The `commandBuffer` parameter in [vkCmdCopyMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapEXT)

* 
The `commandBuffer` parameter in [vkCmdCopyMicromapToMemoryEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapToMemoryEXT)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryToMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMemoryToMicromapEXT)

* 
The `commandBuffer` parameter in [vkCmdWriteMicromapsPropertiesEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdWriteMicromapsPropertiesEXT)

* 
The `commandBuffer` parameter in [vkCmdDrawClusterHUAWEI](drawing.html#vkCmdDrawClusterHUAWEI)

* 
The `commandBuffer` parameter in [vkCmdDrawClusterIndirectHUAWEI](drawing.html#vkCmdDrawClusterIndirectHUAWEI)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryIndirectNV](copies.html#vkCmdCopyMemoryIndirectNV)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryToImageIndirectNV](copies.html#vkCmdCopyMemoryToImageIndirectNV)

* 
The `commandBuffer` parameter in [vkCmdDecompressMemoryNV](memory_decompression.html#vkCmdDecompressMemoryNV)

* 
The `commandBuffer` parameter in [vkCmdDecompressMemoryIndirectCountNV](memory_decompression.html#vkCmdDecompressMemoryIndirectCountNV)

* 
The `commandBuffer` parameter in [vkCmdUpdatePipelineIndirectBufferNV](pipelines.html#vkCmdUpdatePipelineIndirectBufferNV)

* 
The `commandBuffer` parameter in [vkCmdSetDepthClampEnableEXT](vertexpostproc.html#vkCmdSetDepthClampEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetPolygonModeEXT](primsrast.html#vkCmdSetPolygonModeEXT)

* 
The `commandBuffer` parameter in [vkCmdSetRasterizationSamplesEXT](primsrast.html#vkCmdSetRasterizationSamplesEXT)

* 
The `commandBuffer` parameter in [vkCmdSetSampleMaskEXT](fragops.html#vkCmdSetSampleMaskEXT)

* 
The `commandBuffer` parameter in [vkCmdSetAlphaToCoverageEnableEXT](fragops.html#vkCmdSetAlphaToCoverageEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetAlphaToOneEnableEXT](fragops.html#vkCmdSetAlphaToOneEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetLogicOpEnableEXT](framebuffer.html#vkCmdSetLogicOpEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetColorBlendEnableEXT](framebuffer.html#vkCmdSetColorBlendEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetColorBlendEquationEXT](framebuffer.html#vkCmdSetColorBlendEquationEXT)

* 
The `commandBuffer` parameter in [vkCmdSetColorWriteMaskEXT](framebuffer.html#vkCmdSetColorWriteMaskEXT)

* 
The `commandBuffer` parameter in [vkCmdSetTessellationDomainOriginEXT](tessellation.html#vkCmdSetTessellationDomainOriginEXT)

* 
The `commandBuffer` parameter in [vkCmdSetRasterizationStreamEXT](primsrast.html#vkCmdSetRasterizationStreamEXT)

* 
The `commandBuffer` parameter in [vkCmdSetConservativeRasterizationModeEXT](primsrast.html#vkCmdSetConservativeRasterizationModeEXT)

* 
The `commandBuffer` parameter in [vkCmdSetExtraPrimitiveOverestimationSizeEXT](primsrast.html#vkCmdSetExtraPrimitiveOverestimationSizeEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthClipEnableEXT](vertexpostproc.html#vkCmdSetDepthClipEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetSampleLocationsEnableEXT](primsrast.html#vkCmdSetSampleLocationsEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetColorBlendAdvancedEXT](framebuffer.html#vkCmdSetColorBlendAdvancedEXT)

* 
The `commandBuffer` parameter in [vkCmdSetProvokingVertexModeEXT](vertexpostproc.html#vkCmdSetProvokingVertexModeEXT)

* 
The `commandBuffer` parameter in [vkCmdSetLineRasterizationModeEXT](primsrast.html#vkCmdSetLineRasterizationModeEXT)

* 
The `commandBuffer` parameter in [vkCmdSetLineStippleEnableEXT](primsrast.html#vkCmdSetLineStippleEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthClipNegativeOneToOneEXT](vertexpostproc.html#vkCmdSetDepthClipNegativeOneToOneEXT)

* 
The `commandBuffer` parameter in [vkCmdSetViewportWScalingEnableNV](vertexpostproc.html#vkCmdSetViewportWScalingEnableNV)

* 
The `commandBuffer` parameter in [vkCmdSetViewportSwizzleNV](vertexpostproc.html#vkCmdSetViewportSwizzleNV)

* 
The `commandBuffer` parameter in [vkCmdSetCoverageToColorEnableNV](fragops.html#vkCmdSetCoverageToColorEnableNV)

* 
The `commandBuffer` parameter in [vkCmdSetCoverageToColorLocationNV](fragops.html#vkCmdSetCoverageToColorLocationNV)

* 
The `commandBuffer` parameter in [vkCmdSetCoverageModulationModeNV](fragops.html#vkCmdSetCoverageModulationModeNV)

* 
The `commandBuffer` parameter in [vkCmdSetCoverageModulationTableEnableNV](fragops.html#vkCmdSetCoverageModulationTableEnableNV)

* 
The `commandBuffer` parameter in [vkCmdSetCoverageModulationTableNV](fragops.html#vkCmdSetCoverageModulationTableNV)

* 
The `commandBuffer` parameter in [vkCmdSetShadingRateImageEnableNV](primsrast.html#vkCmdSetShadingRateImageEnableNV)

* 
The `commandBuffer` parameter in [vkCmdSetRepresentativeFragmentTestEnableNV](fragops.html#vkCmdSetRepresentativeFragmentTestEnableNV)

* 
The `commandBuffer` parameter in [vkCmdSetCoverageReductionModeNV](fragops.html#vkCmdSetCoverageReductionModeNV)

* 
The `tensor` parameter in [vkDestroyTensorARM](resources.html#vkDestroyTensorARM)

* 
The `tensorView` parameter in [vkDestroyTensorViewARM](resources.html#vkDestroyTensorViewARM)

* 
The `commandBuffer` parameter in [vkCmdCopyTensorARM](copies.html#vkCmdCopyTensorARM)

* 
The `shader` parameter in [vkDestroyShaderEXT](shaders.html#vkDestroyShaderEXT)

* 
The `commandBuffer` parameter in [vkCmdBindShadersEXT](shaders.html#vkCmdBindShadersEXT)

* 
The `commandBuffer` parameter in [vkCmdSetDepthClampRangeEXT](fragops.html#vkCmdSetDepthClampRangeEXT)

* 
The `commandBuffer` parameter in [vkCmdConvertCooperativeVectorMatrixNV](shaders.html#vkCmdConvertCooperativeVectorMatrixNV)

* 
The `session` parameter in [vkDestroyDataGraphPipelineSessionARM](VK_ARM_data_graph/graphs.html#vkDestroyDataGraphPipelineSessionARM)

* 
The `commandBuffer` parameter in [vkCmdDispatchDataGraphARM](VK_ARM_data_graph/graphs.html#vkCmdDispatchDataGraphARM)

* 
The `commandBuffer` parameter in [vkCmdSetAttachmentFeedbackLoopEnableEXT](renderpass.html#vkCmdSetAttachmentFeedbackLoopEnableEXT)

* 
The `commandBuffer` parameter in [vkCmdBindTileMemoryQCOM](memory.html#vkCmdBindTileMemoryQCOM)

* 
The `commandBuffer` parameter in [vkCmdDecompressMemoryEXT](memory_decompression.html#vkCmdDecompressMemoryEXT)

* 
The `commandBuffer` parameter in [vkCmdDecompressMemoryIndirectCountEXT](memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT)

* 
The `commandBuffer` parameter in [vkCmdBuildClusterAccelerationStructureIndirectNV](accelstructures.html#vkCmdBuildClusterAccelerationStructureIndirectNV)

* 
The `commandBuffer` parameter in [vkCmdBuildPartitionedAccelerationStructuresNV](accelstructures.html#vkCmdBuildPartitionedAccelerationStructuresNV)

* 
The `commandBuffer` parameter in [vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT)

* 
The `stateCommandBuffer` parameter in [vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT)

* 
The `commandBuffer` parameter in [vkCmdExecuteGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdExecuteGeneratedCommandsEXT)

* 
The `indirectCommandsLayout` parameter in [vkDestroyIndirectCommandsLayoutEXT](device_generated_commands/generatedcommands.html#vkDestroyIndirectCommandsLayoutEXT)

* 
The `indirectExecutionSet` parameter in [vkDestroyIndirectExecutionSetEXT](device_generated_commands/generatedcommands.html#vkDestroyIndirectExecutionSetEXT)

* 
The `indirectExecutionSet` parameter in [vkUpdateIndirectExecutionSetPipelineEXT](device_generated_commands/generatedcommands.html#vkUpdateIndirectExecutionSetPipelineEXT)

* 
The `indirectExecutionSet` parameter in [vkUpdateIndirectExecutionSetShaderEXT](device_generated_commands/generatedcommands.html#vkUpdateIndirectExecutionSetShaderEXT)

* 
The `instrumentation` parameter in [vkDestroyShaderInstrumentationARM](shaders.html#vkDestroyShaderInstrumentationARM)

* 
The `commandBuffer` parameter in [vkCmdBeginShaderInstrumentationARM](shaders.html#vkCmdBeginShaderInstrumentationARM)

* 
The `instrumentation` parameter in [vkCmdBeginShaderInstrumentationARM](shaders.html#vkCmdBeginShaderInstrumentationARM)

* 
The `commandBuffer` parameter in [vkCmdEndShaderInstrumentationARM](shaders.html#vkCmdEndShaderInstrumentationARM)

* 
The `commandBuffer` parameter in [vkCmdEndRendering2EXT](renderpass.html#vkCmdEndRendering2EXT)

* 
The `commandBuffer` parameter in [vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT)

* 
The `accelerationStructure` parameter in [vkDestroyAccelerationStructureKHR](resources.html#vkDestroyAccelerationStructureKHR)

* 
The `commandBuffer` parameter in [vkCmdBuildAccelerationStructuresKHR](accelstructures.html#vkCmdBuildAccelerationStructuresKHR)

* 
The `commandBuffer` parameter in [vkCmdBuildAccelerationStructuresIndirectKHR](accelstructures.html#vkCmdBuildAccelerationStructuresIndirectKHR)

* 
The `commandBuffer` parameter in [vkCmdCopyAccelerationStructureKHR](accelstructures.html#vkCmdCopyAccelerationStructureKHR)

* 
The `commandBuffer` parameter in [vkCmdCopyAccelerationStructureToMemoryKHR](accelstructures.html#vkCmdCopyAccelerationStructureToMemoryKHR)

* 
The `commandBuffer` parameter in [vkCmdCopyMemoryToAccelerationStructureKHR](accelstructures.html#vkCmdCopyMemoryToAccelerationStructureKHR)

* 
The `commandBuffer` parameter in [vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR)

* 
The `commandBuffer` parameter in [vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR)

* 
The `pipelineCache` parameter in [vkCreateRayTracingPipelinesKHR](pipelines.html#vkCreateRayTracingPipelinesKHR), conditionally1

* 
The `commandBuffer` parameter in [vkCmdTraceRaysIndirectKHR](raytracing.html#vkCmdTraceRaysIndirectKHR)

* 
The `commandBuffer` parameter in [vkCmdSetRayTracingPipelineStackSizeKHR](pipelines.html#vkCmdSetRayTracingPipelineStackSizeKHR)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksEXT](drawing.html#vkCmdDrawMeshTasksEXT)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksIndirectEXT](drawing.html#vkCmdDrawMeshTasksIndirectEXT)

* 
The `commandBuffer` parameter in [vkCmdDrawMeshTasksIndirectCountEXT](drawing.html#vkCmdDrawMeshTasksIndirectCountEXT)

* 
The `commandPool` member of [VkCommandBufferAllocateInfo](cmdbuffers.html#VkCommandBufferAllocateInfo)

* 
The `dstSet` member of [VkCopyDescriptorSet](descriptorsets.html#VkCopyDescriptorSet), conditionally1

* 
The `descriptorPool` member of [VkDescriptorSetAllocateInfo](descriptorsets.html#VkDescriptorSetAllocateInfo)

* 
The `buffer` member of [VkBindBufferMemoryInfo](resources.html#VkBindBufferMemoryInfo)

* 
The `image` member of [VkBindImageMemoryInfo](resources.html#VkBindImageMemoryInfo)

* 
The `memory` member of [VkMemoryMapInfo](memory.html#VkMemoryMapInfo)

* 
The `memory` member of [VkMemoryUnmapInfo](memory.html#VkMemoryUnmapInfo)

* 
The `surface` member of [VkSwapchainCreateInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainCreateInfoKHR)

* 
The `oldSwapchain` member of [VkSwapchainCreateInfoKHR](VK_KHR_surface/wsi.html#VkSwapchainCreateInfoKHR)

* 
The `swapchain` member of [VkBindImageMemorySwapchainInfoKHR](resources.html#VkBindImageMemorySwapchainInfoKHR)

* 
The `swapchain` member of [VkAcquireNextImageInfoKHR](VK_KHR_surface/wsi.html#VkAcquireNextImageInfoKHR)

* 
The `semaphore` member of [VkAcquireNextImageInfoKHR](VK_KHR_surface/wsi.html#VkAcquireNextImageInfoKHR)

* 
The `fence` member of [VkAcquireNextImageInfoKHR](VK_KHR_surface/wsi.html#VkAcquireNextImageInfoKHR)

* 
The `semaphore` member of [VkImportSemaphoreWin32HandleInfoKHR](synchronization.html#VkImportSemaphoreWin32HandleInfoKHR)

* 
The `semaphore` member of [VkImportSemaphoreFdInfoKHR](synchronization.html#VkImportSemaphoreFdInfoKHR)

* 
The `fence` member of [VkImportFenceWin32HandleInfoKHR](synchronization.html#VkImportFenceWin32HandleInfoKHR)

* 
The `fence` member of [VkImportFenceFdInfoKHR](synchronization.html#VkImportFenceFdInfoKHR)

* 
The `mode` member of [VkDisplayPlaneInfo2KHR](VK_KHR_surface/wsi.html#VkDisplayPlaneInfo2KHR)

* 
The `pipeline` member of [VkReleaseCapturedPipelineDataInfoKHR](pipelines.html#VkReleaseCapturedPipelineDataInfoKHR)

* 
The `swapchain` member of [VkReleaseSwapchainImagesInfoKHR](VK_KHR_surface/wsi.html#VkReleaseSwapchainImagesInfoKHR)

* 
The `object` member of [VkDebugMarkerObjectNameInfoEXT](debugging.html#VkDebugMarkerObjectNameInfoEXT)

* 
The `object` member of [VkDebugMarkerObjectTagInfoEXT](debugging.html#VkDebugMarkerObjectTagInfoEXT)

* 
The `objectHandle` member of [VkDebugUtilsObjectTagInfoEXT](debugging.html#VkDebugUtilsObjectTagInfoEXT)

* 
The `swapchain` member of [VkPastPresentationTimingInfoEXT](VK_KHR_surface/wsi.html#VkPastPresentationTimingInfoEXT)

* 
The `semaphore` member of [VkImportSemaphoreZirconHandleInfoFUCHSIA](synchronization.html#VkImportSemaphoreZirconHandleInfoFUCHSIA)

* 
The `tensor` member of [VkBindTensorMemoryInfoARM](resources.html#VkBindTensorMemoryInfoARM)

1 See Valid Usage language for this token for details.

There are also a few instances where a command **can** take in an
application-allocated list whose contents are externally synchronized
parameters.
In these cases, the caller **must** guarantee that at most one thread is using
a given element within the list at a given time.
These parameters are listed below.

Externally Synchronized Parameter and Member Lists

* 
Each element of the `pFences` parameter in [vkResetFences](synchronization.html#vkResetFences)

* 
Each element of the `pCommandBuffers` parameter in [vkFreeCommandBuffers](cmdbuffers.html#vkFreeCommandBuffers)

* 
Each element of the `pDescriptorSets` parameter in [vkFreeDescriptorSets](descriptorsets.html#vkFreeDescriptorSets)

* 
The `dstSet` member of each element of the `pDescriptorWrites` parameter in [vkUpdateDescriptorSets](descriptorsets.html#vkUpdateDescriptorSets), conditionally1

* 
Each element of the `pWaitSemaphores` member of [VkPresentInfoKHR](VK_KHR_surface/wsi.html#VkPresentInfoKHR)

* 
Each element of the `pSwapchains` member of [VkPresentInfoKHR](VK_KHR_surface/wsi.html#VkPresentInfoKHR)

1 See Valid Usage language for this token for details.

In addition, there are some implicit parameters that need to be externally
synchronized.
For example, when a `commandBuffer` parameter needs to be externally
synchronized, it implies that the `commandPool` from which that command
buffer was allocated also needs to be externally synchronized.
The implicit parameters and their associated object are listed below.

Implicit Externally Synchronized Parameters

* 
All `VkPhysicalDevice` objects enumerated from `instance` in [vkDestroyInstance](initialization.html#vkDestroyInstance)

* 
All `VkQueue` objects created from `device` in [vkDestroyDevice](devsandqueues.html#vkDestroyDevice)

* 
All `VkQueue` objects created from `device`
that are not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)
             in [vkDeviceWaitIdle](synchronization.html#vkDeviceWaitIdle)

* 
The `VkCommandPool` that `commandBuffer` was allocated from in [vkBeginCommandBuffer](cmdbuffers.html#vkBeginCommandBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from in [vkEndCommandBuffer](cmdbuffers.html#vkEndCommandBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from in [vkResetCommandBuffer](cmdbuffers.html#vkResetCommandBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyBuffer](copies.html#vkCmdCopyBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyImage](copies.html#vkCmdCopyImage)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyBufferToImage](copies.html#vkCmdCopyBufferToImage)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyImageToBuffer](copies.html#vkCmdCopyImageToBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdUpdateBuffer](clears.html#vkCmdUpdateBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdFillBuffer](clears.html#vkCmdFillBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPipelineBarrier](synchronization.html#vkCmdPipelineBarrier)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginQuery](queries.html#vkCmdBeginQuery)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndQuery](queries.html#vkCmdEndQuery)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdResetQueryPool](queries.html#vkCmdResetQueryPool)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteTimestamp](queries.html#vkCmdWriteTimestamp)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyQueryPoolResults](queries.html#vkCmdCopyQueryPoolResults)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdExecuteCommands](cmdbuffers.html#vkCmdExecuteCommands)

* 
Any `VkDescriptorSet` objects allocated from `descriptorPool` in [vkResetDescriptorPool](descriptorsets.html#vkResetDescriptorPool)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindPipeline](pipelines.html#vkCmdBindPipeline)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdClearColorImage](clears.html#vkCmdClearColorImage)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatch](dispatch.html#vkCmdDispatch)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchIndirect](dispatch.html#vkCmdDispatchIndirect)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetEvent](synchronization.html#vkCmdSetEvent)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdResetEvent](synchronization.html#vkCmdResetEvent)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWaitEvents](synchronization.html#vkCmdWaitEvents)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushConstants](descriptorsets.html#vkCmdPushConstants)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetViewport](vertexpostproc.html#vkCmdSetViewport)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetScissor](fragops.html#vkCmdSetScissor)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLineWidth](primsrast.html#vkCmdSetLineWidth)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthBias](primsrast.html#vkCmdSetDepthBias)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetBlendConstants](framebuffer.html#vkCmdSetBlendConstants)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthBounds](fragops.html#vkCmdSetDepthBounds)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetStencilCompareMask](fragops.html#vkCmdSetStencilCompareMask)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetStencilWriteMask](fragops.html#vkCmdSetStencilWriteMask)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetStencilReference](fragops.html#vkCmdSetStencilReference)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindIndexBuffer](drawing.html#vkCmdBindIndexBuffer)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindVertexBuffers](fxvertex.html#vkCmdBindVertexBuffers)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDraw](drawing.html#vkCmdDraw)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndexed](drawing.html#vkCmdDrawIndexed)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirect](drawing.html#vkCmdDrawIndirect)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndexedIndirect](drawing.html#vkCmdDrawIndexedIndirect)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBlitImage](copies.html#vkCmdBlitImage)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdClearDepthStencilImage](clears.html#vkCmdClearDepthStencilImage)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdClearAttachments](clears.html#vkCmdClearAttachments)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdResolveImage](copies.html#vkCmdResolveImage)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginRenderPass](renderpass.html#vkCmdBeginRenderPass)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdNextSubpass](renderpass.html#vkCmdNextSubpass)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndRenderPass](renderpass.html#vkCmdEndRenderPass)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDeviceMask](cmdbuffers.html#vkCmdSetDeviceMask)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchBase](dispatch.html#vkCmdDispatchBase)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirectCount](drawing.html#vkCmdDrawIndirectCount)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndexedIndirectCount](drawing.html#vkCmdDrawIndexedIndirectCount)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginRenderPass2](renderpass.html#vkCmdBeginRenderPass2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdNextSubpass2](renderpass.html#vkCmdNextSubpass2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndRenderPass2](renderpass.html#vkCmdEndRenderPass2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPipelineBarrier2](synchronization.html#vkCmdPipelineBarrier2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteTimestamp2](queries.html#vkCmdWriteTimestamp2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyBuffer2](copies.html#vkCmdCopyBuffer2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyImage2](copies.html#vkCmdCopyImage2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyBufferToImage2](copies.html#vkCmdCopyBufferToImage2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyImageToBuffer2](copies.html#vkCmdCopyImageToBuffer2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetEvent2](synchronization.html#vkCmdSetEvent2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdResetEvent2](synchronization.html#vkCmdResetEvent2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWaitEvents2](synchronization.html#vkCmdWaitEvents2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBlitImage2](copies.html#vkCmdBlitImage2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdResolveImage2](copies.html#vkCmdResolveImage2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginRendering](renderpass.html#vkCmdBeginRendering)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndRendering](renderpass.html#vkCmdEndRendering)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCullMode](primsrast.html#vkCmdSetCullMode)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetFrontFace](primsrast.html#vkCmdSetFrontFace)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPrimitiveTopology](drawing.html#vkCmdSetPrimitiveTopology)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetViewportWithCount](vertexpostproc.html#vkCmdSetViewportWithCount)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetScissorWithCount](vertexpostproc.html#vkCmdSetScissorWithCount)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindVertexBuffers2](fxvertex.html#vkCmdBindVertexBuffers2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthTestEnable](fragops.html#vkCmdSetDepthTestEnable)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthWriteEnable](fragops.html#vkCmdSetDepthWriteEnable)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthCompareOp](fragops.html#vkCmdSetDepthCompareOp)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthBoundsTestEnable](fragops.html#vkCmdSetDepthBoundsTestEnable)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetStencilTestEnable](fragops.html#vkCmdSetStencilTestEnable)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetStencilOp](fragops.html#vkCmdSetStencilOp)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRasterizerDiscardEnable](primsrast.html#vkCmdSetRasterizerDiscardEnable)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthBiasEnable](primsrast.html#vkCmdSetDepthBiasEnable)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPrimitiveRestartEnable](drawing.html#vkCmdSetPrimitiveRestartEnable)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSet](descriptorsets.html#vkCmdPushDescriptorSet)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSetWithTemplate](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindDescriptorSets2](descriptorsets.html#vkCmdBindDescriptorSets2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushConstants2](descriptorsets.html#vkCmdPushConstants2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSet2](descriptorsets.html#vkCmdPushDescriptorSet2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSetWithTemplate2](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLineStipple](primsrast.html#vkCmdSetLineStipple)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindIndexBuffer2](drawing.html#vkCmdBindIndexBuffer2)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRenderingAttachmentLocations](interfaces.html#vkCmdSetRenderingAttachmentLocations)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRenderingInputAttachmentIndices](interfaces.html#vkCmdSetRenderingInputAttachmentIndices)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginVideoCodingKHR](videocoding.html#vkCmdBeginVideoCodingKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndVideoCodingKHR](videocoding.html#vkCmdEndVideoCodingKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdControlVideoCodingKHR](videocoding.html#vkCmdControlVideoCodingKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDecodeVideoKHR](videocoding.html#vkCmdDecodeVideoKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginRenderingKHR](renderpass.html#vkCmdBeginRenderingKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndRenderingKHR](renderpass.html#vkCmdEndRenderingKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDeviceMaskKHR](cmdbuffers.html#vkCmdSetDeviceMaskKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchBaseKHR](dispatch.html#vkCmdDispatchBaseKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSetKHR](descriptorsets.html#vkCmdPushDescriptorSetKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSetWithTemplateKHR](descriptorsets.html#vkCmdPushDescriptorSetWithTemplateKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginRenderPass2KHR](renderpass.html#vkCmdBeginRenderPass2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdNextSubpass2KHR](renderpass.html#vkCmdNextSubpass2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndRenderPass2KHR](renderpass.html#vkCmdEndRenderPass2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirectCountKHR](drawing.html#vkCmdDrawIndirectCountKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndexedIndirectCountKHR](drawing.html#vkCmdDrawIndexedIndirectCountKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetFragmentShadingRateKHR](primsrast.html#vkCmdSetFragmentShadingRateKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRenderingAttachmentLocationsKHR](interfaces.html#vkCmdSetRenderingAttachmentLocationsKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRenderingInputAttachmentIndicesKHR](interfaces.html#vkCmdSetRenderingInputAttachmentIndicesKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEncodeVideoKHR](videocoding.html#vkCmdEncodeVideoKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetEvent2KHR](synchronization.html#vkCmdSetEvent2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdResetEvent2KHR](synchronization.html#vkCmdResetEvent2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWaitEvents2KHR](synchronization.html#vkCmdWaitEvents2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPipelineBarrier2KHR](synchronization.html#vkCmdPipelineBarrier2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteTimestamp2KHR](queries.html#vkCmdWriteTimestamp2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindIndexBuffer3KHR](drawing.html#vkCmdBindIndexBuffer3KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindVertexBuffers3KHR](fxvertex.html#vkCmdBindVertexBuffers3KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirect2KHR](drawing.html#vkCmdDrawIndirect2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndexedIndirect2KHR](drawing.html#vkCmdDrawIndexedIndirect2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchIndirect2KHR](dispatch.html#vkCmdDispatchIndirect2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryKHR](copies.html#vkCmdCopyMemoryKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryToImageKHR](copies.html#vkCmdCopyMemoryToImageKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyImageToMemoryKHR](copies.html#vkCmdCopyImageToMemoryKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdUpdateMemoryKHR](clears.html#vkCmdUpdateMemoryKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdFillMemoryKHR](clears.html#vkCmdFillMemoryKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyQueryPoolResultsToMemoryKHR](queries.html#vkCmdCopyQueryPoolResultsToMemoryKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirectCount2KHR](drawing.html#vkCmdDrawIndirectCount2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndexedIndirectCount2KHR](drawing.html#vkCmdDrawIndexedIndirectCount2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginConditionalRendering2EXT](drawing.html#vkCmdBeginConditionalRendering2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindTransformFeedbackBuffers2EXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffers2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginTransformFeedback2EXT](vertexpostproc.html#vkCmdBeginTransformFeedback2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndTransformFeedback2EXT](vertexpostproc.html#vkCmdEndTransformFeedback2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirectByteCount2EXT](drawing.html#vkCmdDrawIndirectByteCount2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksIndirect2EXT](drawing.html#vkCmdDrawMeshTasksIndirect2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksIndirectCount2EXT](drawing.html#vkCmdDrawMeshTasksIndirectCount2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteMarkerToMemoryAMD](copies.html#vkCmdWriteMarkerToMemoryAMD)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyBuffer2KHR](copies.html#vkCmdCopyBuffer2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyImage2KHR](copies.html#vkCmdCopyImage2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyBufferToImage2KHR](copies.html#vkCmdCopyBufferToImage2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyImageToBuffer2KHR](copies.html#vkCmdCopyImageToBuffer2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBlitImage2KHR](copies.html#vkCmdBlitImage2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdResolveImage2KHR](copies.html#vkCmdResolveImage2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdTraceRaysIndirect2KHR](raytracing.html#vkCmdTraceRaysIndirect2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindIndexBuffer2KHR](drawing.html#vkCmdBindIndexBuffer2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLineStippleKHR](primsrast.html#vkCmdSetLineStippleKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindDescriptorSets2KHR](descriptorsets.html#vkCmdBindDescriptorSets2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushConstants2KHR](descriptorsets.html#vkCmdPushConstants2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSet2KHR](descriptorsets.html#vkCmdPushDescriptorSet2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDescriptorSetWithTemplate2KHR](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDescriptorBufferOffsets2EXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsets2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindDescriptorBufferEmbeddedSamplers2EXT](descriptorsets.html#vkCmdBindDescriptorBufferEmbeddedSamplers2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryIndirectKHR](copies.html#vkCmdCopyMemoryIndirectKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryToImageIndirectKHR](copies.html#vkCmdCopyMemoryToImageIndirectKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndRendering2KHR](renderpass.html#vkCmdEndRendering2KHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDebugMarkerBeginEXT](debugging.html#vkCmdDebugMarkerBeginEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDebugMarkerEndEXT](debugging.html#vkCmdDebugMarkerEndEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDebugMarkerInsertEXT](debugging.html#vkCmdDebugMarkerInsertEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindTransformFeedbackBuffersEXT](vertexpostproc.html#vkCmdBindTransformFeedbackBuffersEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginTransformFeedbackEXT](vertexpostproc.html#vkCmdBeginTransformFeedbackEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndTransformFeedbackEXT](vertexpostproc.html#vkCmdEndTransformFeedbackEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginQueryIndexedEXT](queries.html#vkCmdBeginQueryIndexedEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndQueryIndexedEXT](queries.html#vkCmdEndQueryIndexedEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirectByteCountEXT](drawing.html#vkCmdDrawIndirectByteCountEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCuLaunchKernelNVX](../appendices/extensions.html#vkCmdCuLaunchKernelNVX)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndirectCountAMD](drawing.html#vkCmdDrawIndirectCountAMD)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawIndexedIndirectCountAMD](drawing.html#vkCmdDrawIndexedIndirectCountAMD)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginConditionalRenderingEXT](drawing.html#vkCmdBeginConditionalRenderingEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndConditionalRenderingEXT](drawing.html#vkCmdEndConditionalRenderingEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetViewportWScalingNV](vertexpostproc.html#vkCmdSetViewportWScalingNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDiscardRectangleEXT](fragops.html#vkCmdSetDiscardRectangleEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDiscardRectangleEnableEXT](fragops.html#vkCmdSetDiscardRectangleEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDiscardRectangleModeEXT](fragops.html#vkCmdSetDiscardRectangleModeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginDebugUtilsLabelEXT](debugging.html#vkCmdBeginDebugUtilsLabelEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndDebugUtilsLabelEXT](debugging.html#vkCmdEndDebugUtilsLabelEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdInsertDebugUtilsLabelEXT](debugging.html#vkCmdInsertDebugUtilsLabelEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdInitializeGraphScratchMemoryAMDX](executiongraphs.html#vkCmdInitializeGraphScratchMemoryAMDX)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchGraphAMDX](executiongraphs.html#vkCmdDispatchGraphAMDX)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchGraphIndirectAMDX](executiongraphs.html#vkCmdDispatchGraphIndirectAMDX)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchGraphIndirectCountAMDX](executiongraphs.html#vkCmdDispatchGraphIndirectCountAMDX)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindSamplerHeapEXT](descriptorheaps.html#vkCmdBindSamplerHeapEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindResourceHeapEXT](descriptorheaps.html#vkCmdBindResourceHeapEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPushDataEXT](descriptorheaps.html#vkCmdPushDataEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetSampleLocationsEXT](primsrast.html#vkCmdSetSampleLocationsEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindShadingRateImageNV](primsrast.html#vkCmdBindShadingRateImageNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetViewportShadingRatePaletteNV](primsrast.html#vkCmdSetViewportShadingRatePaletteNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCoarseSampleOrderNV](primsrast.html#vkCmdSetCoarseSampleOrderNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBuildAccelerationStructureNV](accelstructures.html#vkCmdBuildAccelerationStructureNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyAccelerationStructureNV](accelstructures.html#vkCmdCopyAccelerationStructureNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdTraceRaysNV](raytracing.html#vkCmdTraceRaysNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteBufferMarkerAMD](copies.html#vkCmdWriteBufferMarkerAMD)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteBufferMarker2AMD](copies.html#vkCmdWriteBufferMarker2AMD)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksNV](drawing.html#vkCmdDrawMeshTasksNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksIndirectNV](drawing.html#vkCmdDrawMeshTasksIndirectNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksIndirectCountNV](drawing.html#vkCmdDrawMeshTasksIndirectCountNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetExclusiveScissorEnableNV](fragops.html#vkCmdSetExclusiveScissorEnableNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetExclusiveScissorNV](fragops.html#vkCmdSetExclusiveScissorNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCheckpointNV](debugging.html#vkCmdSetCheckpointNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPerformanceMarkerINTEL](queries.html#vkCmdSetPerformanceMarkerINTEL)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPerformanceStreamMarkerINTEL](queries.html#vkCmdSetPerformanceStreamMarkerINTEL)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPerformanceOverrideINTEL](queries.html#vkCmdSetPerformanceOverrideINTEL)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLineStippleEXT](primsrast.html#vkCmdSetLineStippleEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCullModeEXT](primsrast.html#vkCmdSetCullModeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetFrontFaceEXT](primsrast.html#vkCmdSetFrontFaceEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPrimitiveTopologyEXT](drawing.html#vkCmdSetPrimitiveTopologyEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetViewportWithCountEXT](vertexpostproc.html#vkCmdSetViewportWithCountEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetScissorWithCountEXT](vertexpostproc.html#vkCmdSetScissorWithCountEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindVertexBuffers2EXT](fxvertex.html#vkCmdBindVertexBuffers2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthTestEnableEXT](fragops.html#vkCmdSetDepthTestEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthWriteEnableEXT](fragops.html#vkCmdSetDepthWriteEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthCompareOpEXT](fragops.html#vkCmdSetDepthCompareOpEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthBoundsTestEnableEXT](fragops.html#vkCmdSetDepthBoundsTestEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetStencilTestEnableEXT](fragops.html#vkCmdSetStencilTestEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetStencilOpEXT](fragops.html#vkCmdSetStencilOpEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPreprocessGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdExecuteGeneratedCommandsNV](device_generated_commands/generatedcommands.html#vkCmdExecuteGeneratedCommandsNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindPipelineShaderGroupNV](pipelines.html#vkCmdBindPipelineShaderGroupNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthBias2EXT](primsrast.html#vkCmdSetDepthBias2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCudaLaunchKernelNV](dispatch.html#vkCmdCudaLaunchKernelNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchTileQCOM](dispatch.html#vkCmdDispatchTileQCOM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginPerTileExecutionQCOM](renderpass.html#vkCmdBeginPerTileExecutionQCOM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndPerTileExecutionQCOM](renderpass.html#vkCmdEndPerTileExecutionQCOM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindDescriptorBuffersEXT](descriptorsets.html#vkCmdBindDescriptorBuffersEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDescriptorBufferOffsetsEXT](descriptorsets.html#vkCmdSetDescriptorBufferOffsetsEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindDescriptorBufferEmbeddedSamplersEXT](descriptorsets.html#vkCmdBindDescriptorBufferEmbeddedSamplersEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetFragmentShadingRateEnumNV](primsrast.html#vkCmdSetFragmentShadingRateEnumNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetVertexInputEXT](fxvertex.html#vkCmdSetVertexInputEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSubpassShadingHUAWEI](dispatch.html#vkCmdSubpassShadingHUAWEI)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindInvocationMaskHUAWEI](raytracing.html#vkCmdBindInvocationMaskHUAWEI)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPatchControlPointsEXT](shaders.html#vkCmdSetPatchControlPointsEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRasterizerDiscardEnableEXT](primsrast.html#vkCmdSetRasterizerDiscardEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthBiasEnableEXT](primsrast.html#vkCmdSetDepthBiasEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLogicOpEXT](framebuffer.html#vkCmdSetLogicOpEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPrimitiveRestartEnableEXT](drawing.html#vkCmdSetPrimitiveRestartEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetColorWriteEnableEXT](framebuffer.html#vkCmdSetColorWriteEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMultiEXT](drawing.html#vkCmdDrawMultiEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMultiIndexedEXT](drawing.html#vkCmdDrawMultiIndexedEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBuildMicromapsEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdBuildMicromapsEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMicromapToMemoryEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapToMemoryEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryToMicromapEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMemoryToMicromapEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteMicromapsPropertiesEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdWriteMicromapsPropertiesEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawClusterHUAWEI](drawing.html#vkCmdDrawClusterHUAWEI)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawClusterIndirectHUAWEI](drawing.html#vkCmdDrawClusterIndirectHUAWEI)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryIndirectNV](copies.html#vkCmdCopyMemoryIndirectNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryToImageIndirectNV](copies.html#vkCmdCopyMemoryToImageIndirectNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDecompressMemoryNV](memory_decompression.html#vkCmdDecompressMemoryNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDecompressMemoryIndirectCountNV](memory_decompression.html#vkCmdDecompressMemoryIndirectCountNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdUpdatePipelineIndirectBufferNV](pipelines.html#vkCmdUpdatePipelineIndirectBufferNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthClampEnableEXT](vertexpostproc.html#vkCmdSetDepthClampEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetPolygonModeEXT](primsrast.html#vkCmdSetPolygonModeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRasterizationSamplesEXT](primsrast.html#vkCmdSetRasterizationSamplesEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetSampleMaskEXT](fragops.html#vkCmdSetSampleMaskEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetAlphaToCoverageEnableEXT](fragops.html#vkCmdSetAlphaToCoverageEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetAlphaToOneEnableEXT](fragops.html#vkCmdSetAlphaToOneEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLogicOpEnableEXT](framebuffer.html#vkCmdSetLogicOpEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetColorBlendEnableEXT](framebuffer.html#vkCmdSetColorBlendEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetColorBlendEquationEXT](framebuffer.html#vkCmdSetColorBlendEquationEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetColorWriteMaskEXT](framebuffer.html#vkCmdSetColorWriteMaskEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetTessellationDomainOriginEXT](tessellation.html#vkCmdSetTessellationDomainOriginEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRasterizationStreamEXT](primsrast.html#vkCmdSetRasterizationStreamEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetConservativeRasterizationModeEXT](primsrast.html#vkCmdSetConservativeRasterizationModeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetExtraPrimitiveOverestimationSizeEXT](primsrast.html#vkCmdSetExtraPrimitiveOverestimationSizeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthClipEnableEXT](vertexpostproc.html#vkCmdSetDepthClipEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetSampleLocationsEnableEXT](primsrast.html#vkCmdSetSampleLocationsEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetColorBlendAdvancedEXT](framebuffer.html#vkCmdSetColorBlendAdvancedEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetProvokingVertexModeEXT](vertexpostproc.html#vkCmdSetProvokingVertexModeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLineRasterizationModeEXT](primsrast.html#vkCmdSetLineRasterizationModeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetLineStippleEnableEXT](primsrast.html#vkCmdSetLineStippleEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthClipNegativeOneToOneEXT](vertexpostproc.html#vkCmdSetDepthClipNegativeOneToOneEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetViewportWScalingEnableNV](vertexpostproc.html#vkCmdSetViewportWScalingEnableNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetViewportSwizzleNV](vertexpostproc.html#vkCmdSetViewportSwizzleNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCoverageToColorEnableNV](fragops.html#vkCmdSetCoverageToColorEnableNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCoverageToColorLocationNV](fragops.html#vkCmdSetCoverageToColorLocationNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCoverageModulationModeNV](fragops.html#vkCmdSetCoverageModulationModeNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCoverageModulationTableEnableNV](fragops.html#vkCmdSetCoverageModulationTableEnableNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCoverageModulationTableNV](fragops.html#vkCmdSetCoverageModulationTableNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetShadingRateImageEnableNV](primsrast.html#vkCmdSetShadingRateImageEnableNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRepresentativeFragmentTestEnableNV](fragops.html#vkCmdSetRepresentativeFragmentTestEnableNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetCoverageReductionModeNV](fragops.html#vkCmdSetCoverageReductionModeNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyTensorARM](copies.html#vkCmdCopyTensorARM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdOpticalFlowExecuteNV](VK_NV_optical_flow/optical_flow.html#vkCmdOpticalFlowExecuteNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindShadersEXT](shaders.html#vkCmdBindShadersEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetDepthClampRangeEXT](fragops.html#vkCmdSetDepthClampRangeEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdConvertCooperativeVectorMatrixNV](shaders.html#vkCmdConvertCooperativeVectorMatrixNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDispatchDataGraphARM](VK_ARM_data_graph/graphs.html#vkCmdDispatchDataGraphARM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetAttachmentFeedbackLoopEnableEXT](renderpass.html#vkCmdSetAttachmentFeedbackLoopEnableEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBindTileMemoryQCOM](memory.html#vkCmdBindTileMemoryQCOM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDecompressMemoryEXT](memory_decompression.html#vkCmdDecompressMemoryEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDecompressMemoryIndirectCountEXT](memory_decompression.html#vkCmdDecompressMemoryIndirectCountEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBuildClusterAccelerationStructureIndirectNV](accelstructures.html#vkCmdBuildClusterAccelerationStructureIndirectNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBuildPartitionedAccelerationStructuresNV](accelstructures.html#vkCmdBuildPartitionedAccelerationStructuresNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdPreprocessGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdPreprocessGeneratedCommandsEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdExecuteGeneratedCommandsEXT](device_generated_commands/generatedcommands.html#vkCmdExecuteGeneratedCommandsEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginShaderInstrumentationARM](shaders.html#vkCmdBeginShaderInstrumentationARM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndShaderInstrumentationARM](shaders.html#vkCmdEndShaderInstrumentationARM)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdEndRendering2EXT](renderpass.html#vkCmdEndRendering2EXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBeginCustomResolveEXT](renderpass.html#vkCmdBeginCustomResolveEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetComputeOccupancyPriorityNV](dispatch.html#vkCmdSetComputeOccupancyPriorityNV)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBuildAccelerationStructuresKHR](accelstructures.html#vkCmdBuildAccelerationStructuresKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdBuildAccelerationStructuresIndirectKHR](accelstructures.html#vkCmdBuildAccelerationStructuresIndirectKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyAccelerationStructureKHR](accelstructures.html#vkCmdCopyAccelerationStructureKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyAccelerationStructureToMemoryKHR](accelstructures.html#vkCmdCopyAccelerationStructureToMemoryKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdCopyMemoryToAccelerationStructureKHR](accelstructures.html#vkCmdCopyMemoryToAccelerationStructureKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdTraceRaysKHR](raytracing.html#vkCmdTraceRaysKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdTraceRaysIndirectKHR](raytracing.html#vkCmdTraceRaysIndirectKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdSetRayTracingPipelineStackSizeKHR](pipelines.html#vkCmdSetRayTracingPipelineStackSizeKHR)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksEXT](drawing.html#vkCmdDrawMeshTasksEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksIndirectEXT](drawing.html#vkCmdDrawMeshTasksIndirectEXT)

* 
The `VkCommandPool` that `commandBuffer` was allocated from, in [vkCmdDrawMeshTasksIndirectCountEXT](drawing.html#vkCmdDrawMeshTasksIndirectCountEXT)

Valid usage defines a set of conditions which **must** be met in order to
achieve well-defined runtime behavior in an application.
These conditions depend only on Vulkan state, and the parameters or objects
whose usage is constrained by the condition.

The core layer assumes applications are using the API correctly.
Except as documented elsewhere in the Specification, the behavior of the
core layer to an application using the API incorrectly is **undefined**, and
**may** include program termination.
However, implementations **must** ensure that incorrect usage by an application
does not affect the integrity of the operating system, the Vulkan
implementation, or other applications in the system using Vulkan.
In particular, any guarantees made by an operating system about whether
memory from one process **can** be visible to another process or not **must** not
be violated by a Vulkan implementation for **any memory allocation**.
Vulkan implementations are not **required** to make additional security or
integrity guarantees beyond those provided by the OS unless explicitly
directed by the application’s use of a particular feature or extension.

|  | For instance, if an operating system guarantees that data in all its memory
| --- | --- |
allocations are set to zero when newly allocated, the Vulkan implementation
**must** make the same guarantees for any allocations it controls (e.g.
[VkDeviceMemory](memory.html#VkDeviceMemory)).

Similarly, if an operating system guarantees that use-after-free of host
allocations will not result in values written by another process becoming
visible, the same guarantees **must** be made by the Vulkan implementation for
device memory. |

If the [`protectedMemory`](features.html#features-protectedMemory) feature is
supported, the implementation provides additional guarantees when invalid
usage occurs to prevent values in protected memory from being accessed or
inferred outside of protected operations, as described in
[Protected Memory Access Rules](memory.html#memory-protected-access-rules).

Some valid usage conditions have dependencies on runtime limits or feature
availability.
It is possible to validate these conditions against Vulkan’s minimum
supported values for these limits and features, or some subset of other
known values.

Valid usage conditions do not cover conditions where well-defined behavior
(including returning an error code) exists.

Valid usage conditions **should** apply to the command or structure where
complete information about the condition would be known during execution of
an application.
This is such that a validation layer or linter **can** be written directly
against these statements at the point they are specified.

|  | This does lead to some non-obvious places for valid usage statements.
| --- | --- |
For instance, the valid values for a structure might depend on a separate
value in the calling command.
In this case, the structure itself will not reference this valid usage as it
is impossible to determine validity from the structure that it is invalid -
instead this valid usage would be attached to the calling command.

Another example is draw state - the state setters are independent, and can
cause a legitimately invalid state configuration between draw calls; so the
valid usage statements are attached to the place where all state needs to be
valid - at the drawing command. |

Valid usage conditions are described in a block labeled “Valid Usage”
following each command or structure they apply to.

Vulkan is a layered API.
The lowest layer is the core Vulkan layer, as defined by this Specification.
The application **can** use additional layers above the core for debugging,
validation, and other purposes.

One of the core principles of Vulkan is that building and submitting command
buffers **should** be highly efficient.
Thus error checking and validation of state in the core layer is minimal,
although more rigorous validation **can** be enabled through the use of layers.

Validation of correct API usage is left to validation layers.
Applications **should** be developed with validation layers enabled, to help
catch and eliminate errors.
Once validated, released applications **should** not enable validation layers
by default.

Some valid usage conditions apply to all commands and structures in the API,
unless explicitly denoted otherwise for a specific command or structure.
These conditions are considered *implicit*, and are described in a block
labeled “Valid Usage (Implicit)” following each command or structure they
apply to.
Implicit valid usage conditions are described in detail below.

Any input parameter to a command that is an object handle **must** be a valid
object handle, unless otherwise specified.
An object handle is valid if:

* 
It has been created or allocated by a previous, successful call to the
API.
Such calls are noted in the Specification.

* 
It has not been deleted or freed by a previous call to the API.
Such calls are noted in the Specification.

* 
Any objects used by that object, either as part of creation or
execution, **must** also be valid.

The reserved values [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and `NULL` **can** be used in place of
valid non-dispatchable handles and dispatchable handles, respectively, when
*explicitly called out in the Specification*.
Any command that creates an object successfully **must** not return these
values.
It is valid to pass these values to `vkDestroy*` or `vkFree*`
commands, which will silently ignore these values.

Any parameter that is a pointer **must** be a *valid pointer* only if it is
explicitly called out by a Valid Usage statement.

A pointer is “valid” if it points at memory containing values of the
number and type(s) expected by the command, and all fundamental types
accessed through the pointer (e.g. as elements of an array or as members of
a structure) satisfy the alignment requirements of the host processor.

Any parameter that is a pointer to `char` **must** be a finite sequence of
values terminated by a null character, or if *explicitly called out in the
Specification*, **can** be `NULL`.

Strings specified as UTF-8 encoded **must** not contain invalid UTF-8
sequences.
See [String Representation](#fundamentals-strings) for additional
information about strings.

Any parameter of an enumerated type **must** be a valid enumerant for that
type.
Use of an enumerant is valid if the following conditions are true:

* 
The enumerant is defined as part of the enumerated type.

* 
The enumerant is not a value suffixed with `_MAX_ENUM`.

This value exists only to ensure that C `enum` types are 32 bits in
size and **must** not be used by applications.

If the enumerant is used in a function that has a [VkInstance](initialization.html#VkInstance) as
its first parameter and either:

* 
it was added by a core version that is supported
(as reported by [vkEnumerateInstanceVersion](initialization.html#vkEnumerateInstanceVersion))
and the value of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion` is greater
than or equal to the version that added it; or

* 
it was added by an [instance extension](../appendices/extensions.html#extensions) that was enabled
for the instance.

If the enumerant is used in a function that has a [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice)
object as its first parameter and either:

* 
it was added by a core version that is supported by that device (as
reported by [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion`);

* 
it was added by an [instance extension](../appendices/extensions.html#extensions) that was enabled
for the instance; or

* 
it was added by a [device extension](../appendices/extensions.html#extensions) that is supported by
that device.

If the enumerant is used in a function that has any other dispatchable
object as its first parameter and either:

* 
it was added by a core version that is supported for the device (as
reported by [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion`); or

* 
it was added by a [device extension](../appendices/extensions.html#extensions) that was enabled for
the device.

Additionally, if the [`maintenance5`](features.html#features-maintenance5) feature is
supported, any integer value representable in the range valid for the
defined type is valid when used in a function that has a
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) object as its first parameter.
Physical device queries will either return results indicating lack of
support, or ignore unsupported values when used as a bit flag in a
`Vk*Flags*` parameter.

Any enumerated type returned from a query command or otherwise output from
Vulkan to the application **must** not have a reserved value.
Reserved values are values not defined by any extension for that enumerated
type.

|  | In some special cases, an enumerant is only meaningful if a feature defined
| --- | --- |
by an extension is also enabled, as well as the extension itself.
The global “valid enumerant” rule described here does not address such
cases. |

|  | This language is intended to accommodate cases such as “hidden” extensions
| --- | --- |
known only to driver internals, or layers enabling extensions without
knowledge of the application, without allowing return of values not defined
by any extension. |

|  | Application developers are encouraged to be careful when using `switch`
| --- | --- |
statements with Vulkan API enums.
This is because new extensions can add new values to existing enums.
Using a `default:` statement within a `switch` may avoid future compilation
issues.

This is particularly true for enums such as [VkDriverId](devsandqueues.html#VkDriverId), which may have
values added that do not belong to a corresponding new extension. |

A collection of flags is represented by a bitmask using the type
`VkFlags`:

// Provided by VK_VERSION_1_0
typedef uint32_t VkFlags;

Bitmasks are passed to many commands and structures to compactly represent
options, but `VkFlags` is not used directly in the API.
Instead, a `Vk*Flags` type which is an alias of `VkFlags`, and
whose name matches the corresponding `Vk*FlagBits` that are valid for
that type, is used.

Any `Vk*Flags` member or parameter used in the API as an input **must** be
a valid combination of bit flags.
A valid combination is either zero or the bitwise OR of valid bit flags.

An individual bit flag is valid for a `Vk*Flags` type if it would be a
[valid enumerant](#fundamentals-validusage-enums) when used with the
equivalent `Vk*FlagBits` type, where the bits type is obtained by taking
the flag type and replacing the trailing `Flags` with `FlagBits`.
For example, a flag value of type [VkColorComponentFlags](framebuffer.html#VkColorComponentFlags) **must** contain
only bit flags defined by [VkColorComponentFlagBits](framebuffer.html#VkColorComponentFlagBits).

Any `Vk*Flags` member or parameter returned from a query command or
otherwise output from Vulkan to the application **may** contain bit flags
**undefined** in its corresponding `Vk*FlagBits` type.
An application **cannot** rely on the state of these unspecified bits.

Only the low-order 31 bits (bit positions zero through 30) are available for
use as flag bits.

|  | This restriction is due to poorly defined behavior by C compilers given a C
| --- | --- |
enumerant value of `0x80000000`.
In some cases adding this enumerant value may increase the size of the
underlying `Vk*FlagBits` type, breaking the ABI. |

A collection of 64-bit flags is represented by a bitmask using the type
`VkFlags64`:

// Provided by VK_VERSION_1_3, VK_KHR_synchronization2
typedef uint64_t VkFlags64;

When the 31 bits available in `VkFlags` are insufficient, the
`VkFlags64` type can be passed to commands and structures to
represent up to 64 options.
`VkFlags64` is not used directly in the API.
Instead, a `Vk*Flags2` type which is an alias of `VkFlags64`, and
whose name matches the corresponding `Vk*FlagBits2` that are valid for
that type, is used.

Any `Vk*Flags2` member or parameter used in the API as an input **must** be
a valid combination of bit flags.
A valid combination is either zero or the bitwise OR of valid bit flags.

An individual bit flag is valid for a `Vk*Flags2` type if it would be a
[valid enumerant](#fundamentals-validusage-enums) when used with the
equivalent `Vk*FlagBits2` type, where the bits type is obtained by
taking the flag type and replacing the trailing `Flags2` with
`FlagBits2`.
For example, a flag value of type [VkAccessFlags2KHR](synchronization.html#VkAccessFlags2KHR) **must** contain only
bit flags defined by [VkAccessFlagBits2KHR](synchronization.html#VkAccessFlagBits2KHR).

Any `Vk*Flags2` member or parameter returned from a query command or
otherwise output from Vulkan to the application **may** contain bit flags
**undefined** in its corresponding `Vk*FlagBits2` type.
An application **cannot** rely on the state of these unspecified bits.

|  | Both the `Vk*FlagBits2` type, and the individual bits defined for that
| --- | --- |
type, are defined as `uint64_t` integers in the C API.
This is in contrast to the 32-bit types, where the `Vk*FlagBits` type is
defined as a C `enum` and the individual bits as enumerants belonging to
that `enum`.
As a result, there is less compile time type checking possible for the
64-bit types.
This is unavoidable since there is no sufficiently portable way to define a
64-bit `enum` type in C99. |

Any parameter that is a structure containing a `sType` member **must** have
a value of `sType` which is a valid [VkStructureType](#VkStructureType) value matching
the type of the structure.

Any parameter that is a structure containing a `void*` `pNext` member
**must** have a value of `pNext` that is either `NULL`, or is a pointer to
a valid *extending structure*, containing `sType` and `pNext`
members as described in the [Vulkan Documentation and Extensions](introduction.html#vulkan-styleguide) document in the section “Extending Structures”.
The set of structures connected by `pNext` pointers is referred to as a
*`pNext` chain*.

Each structure included in the `pNext` chain **must** be defined at runtime
by either:

* 
a core version which is supported

* 
an extension which is enabled

* 
a supported device extension in the case of physical-device-level
functionality added by the device extension

Each type of extending structure **must** not appear more than once in a
`pNext` chain, including any
[aliases](extensions.html#extendingvulkan-compatibility-aliases).
This general rule may be explicitly overridden for specific structures.

Any component of the implementation (the loader, any enabled layers, and
drivers) **must** skip over, without processing (other than reading the
`sType` and `pNext` members) any extending structures in the chain
not defined by core versions or extensions supported by that component.

As a convenience to implementations and layers needing to iterate through a
structure pointer chain, the Vulkan API provides two *base structures*.
These structures allow for some type safety, and can be used by Vulkan API
functions that operate on generic inputs and outputs.

The `VkBaseInStructure` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBaseInStructure {
    VkStructureType                    sType;
    const struct VkBaseInStructure*    pNext;
} VkBaseInStructure;

* 
`sType` is the structure type of the structure being iterated
through.

* 
`pNext` is `NULL` or a pointer to the next structure in a structure
chain.

`VkBaseInStructure` can be used to facilitate iterating through a
read-only structure pointer chain.

The `VkBaseOutStructure` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkBaseOutStructure {
    VkStructureType               sType;
    struct VkBaseOutStructure*    pNext;
} VkBaseOutStructure;

* 
`sType` is the structure type of the structure being iterated
through.

* 
`pNext` is `NULL` or a pointer to the next structure in a structure
chain.

`VkBaseOutStructure` can be used to facilitate iterating through a
structure pointer chain that returns data back to the application.

The above conditions also apply recursively to members of structures
provided as input to a command, either as a direct argument to the command,
or themselves a member of another structure.

Specifics on valid usage of each command are covered in their individual
sections.

Instance-level functionality or behavior added by an [instance extension](../appendices/extensions.html#extensions) to the API **must** not be used unless that extension is supported
by the instance as determined by
[vkEnumerateInstanceExtensionProperties](extensions.html#vkEnumerateInstanceExtensionProperties), and that extension is enabled
in [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo).

Physical-device-level functionality or behavior added by an [instance extension](../appendices/extensions.html#extensions) to the API **must** not be used unless that extension is
supported by the instance as determined by
[vkEnumerateInstanceExtensionProperties](extensions.html#vkEnumerateInstanceExtensionProperties), and that extension is enabled
in [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo).

Physical-device-level functionality or behavior added by a [device extension](../appendices/extensions.html#extensions) to the API **must** not be used unless the conditions
described in [Extending Physical Device From Device Extensions](initialization.html#initialization-phys-dev-extensions) are met.

Device-level functionality added by a [device extension](../appendices/extensions.html#extensions) that
is dispatched from a [VkDevice](devsandqueues.html#VkDevice), or from a child object of a
[VkDevice](devsandqueues.html#VkDevice) **must** not be used unless that extension is supported by the
device as determined by [vkEnumerateDeviceExtensionProperties](extensions.html#vkEnumerateDeviceExtensionProperties), and that
extension is enabled in [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo).

Instance-level functionality or behavior added by a [new core version](../appendices/versions.html#versions) of the API **must** not be used unless it is supported by the
instance as determined by [vkEnumerateInstanceVersion](initialization.html#vkEnumerateInstanceVersion) and the specified
version of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion`.

Physical-device-level functionality or behavior added by a [new core version](../appendices/versions.html#versions) of the API **must** not be used unless it is supported by the
physical device as determined by
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` and the specified version
of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion`.

Device-level functionality or behavior added by a [new core version](../appendices/versions.html#versions) of the API **must** not be used unless it is supported by the device
as determined by [VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`apiVersion` and the
specified version of [VkApplicationInfo](initialization.html#VkApplicationInfo)::`apiVersion`.

While the core Vulkan API is not designed to capture incorrect usage, some
circumstances still require return codes.
Commands in Vulkan return their status via return codes that are in one of
two categories:

* 
Successful completion codes are returned when a command needs to
communicate success or status information.
All successful completion codes are non-negative values.

* 
Runtime error codes are returned when a command needs to communicate a
failure that could only be detected at runtime.
All runtime error codes are negative values.

All return codes in Vulkan are reported via [VkResult](#VkResult) return values.
The possible codes are:

// Provided by VK_VERSION_1_0
typedef enum VkResult {
    VK_SUCCESS = 0,
    VK_NOT_READY = 1,
    VK_TIMEOUT = 2,
    VK_EVENT_SET = 3,
    VK_EVENT_RESET = 4,
    VK_INCOMPLETE = 5,
    VK_ERROR_OUT_OF_HOST_MEMORY = -1,
    VK_ERROR_OUT_OF_DEVICE_MEMORY = -2,
    VK_ERROR_INITIALIZATION_FAILED = -3,
    VK_ERROR_DEVICE_LOST = -4,
    VK_ERROR_MEMORY_MAP_FAILED = -5,
    VK_ERROR_LAYER_NOT_PRESENT = -6,
    VK_ERROR_EXTENSION_NOT_PRESENT = -7,
    VK_ERROR_FEATURE_NOT_PRESENT = -8,
    VK_ERROR_INCOMPATIBLE_DRIVER = -9,
    VK_ERROR_TOO_MANY_OBJECTS = -10,
    VK_ERROR_FORMAT_NOT_SUPPORTED = -11,
    VK_ERROR_FRAGMENTED_POOL = -12,
    VK_ERROR_UNKNOWN = -13,
  // Provided by VK_VERSION_1_0
    VK_ERROR_VALIDATION_FAILED = -1000011001,
  // Provided by VK_VERSION_1_1
    VK_ERROR_OUT_OF_POOL_MEMORY = -1000069000,
  // Provided by VK_VERSION_1_1
    VK_ERROR_INVALID_EXTERNAL_HANDLE = -1000072003,
  // Provided by VK_VERSION_1_2
    VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS = -1000257000,
  // Provided by VK_VERSION_1_2
    VK_ERROR_FRAGMENTATION = -1000161000,
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_COMPILE_REQUIRED = 1000297000,
  // Provided by VK_VERSION_1_4
    VK_ERROR_NOT_PERMITTED = -1000174001,
  // Provided by VK_KHR_surface
    VK_ERROR_SURFACE_LOST_KHR = -1000000000,
  // Provided by VK_KHR_surface
    VK_ERROR_NATIVE_WINDOW_IN_USE_KHR = -1000000001,
  // Provided by VK_KHR_swapchain
    VK_SUBOPTIMAL_KHR = 1000001003,
  // Provided by VK_KHR_swapchain
    VK_ERROR_OUT_OF_DATE_KHR = -1000001004,
  // Provided by VK_KHR_display_swapchain
    VK_ERROR_INCOMPATIBLE_DISPLAY_KHR = -1000003001,
  // Provided by VK_NV_glsl_shader
    VK_ERROR_INVALID_SHADER_NV = -1000012000,
  // Provided by VK_KHR_video_queue
    VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR = -1000023000,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR = -1000023001,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR = -1000023002,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR = -1000023003,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR = -1000023004,
  // Provided by VK_KHR_video_queue
    VK_ERROR_VIDEO_STD_VERSION_NOT_SUPPORTED_KHR = -1000023005,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_ERROR_INVALID_DRM_FORMAT_MODIFIER_PLANE_LAYOUT_EXT = -1000158000,
  // Provided by VK_EXT_present_timing
    VK_ERROR_PRESENT_TIMING_QUEUE_FULL_EXT = -1000208000,
  // Provided by VK_EXT_full_screen_exclusive
    VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT = -1000255000,
  // Provided by VK_KHR_deferred_host_operations
    VK_THREAD_IDLE_KHR = 1000268000,
  // Provided by VK_KHR_deferred_host_operations
    VK_THREAD_DONE_KHR = 1000268001,
  // Provided by VK_KHR_deferred_host_operations
    VK_OPERATION_DEFERRED_KHR = 1000268002,
  // Provided by VK_KHR_deferred_host_operations
    VK_OPERATION_NOT_DEFERRED_KHR = 1000268003,
  // Provided by VK_KHR_video_encode_queue
    VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR = -1000299000,
  // Provided by VK_EXT_image_compression_control
    VK_ERROR_COMPRESSION_EXHAUSTED_EXT = -1000338000,
  // Provided by VK_EXT_shader_object
    VK_INCOMPATIBLE_SHADER_BINARY_EXT = 1000482000,
  // Provided by VK_KHR_pipeline_binary
    VK_PIPELINE_BINARY_MISSING_KHR = 1000483000,
  // Provided by VK_KHR_pipeline_binary
    VK_ERROR_NOT_ENOUGH_SPACE_KHR = -1000483000,
  // Provided by VK_EXT_debug_report
    VK_ERROR_VALIDATION_FAILED_EXT = VK_ERROR_VALIDATION_FAILED,
  // Provided by VK_KHR_maintenance1
    VK_ERROR_OUT_OF_POOL_MEMORY_KHR = VK_ERROR_OUT_OF_POOL_MEMORY,
  // Provided by VK_KHR_external_memory
    VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR = VK_ERROR_INVALID_EXTERNAL_HANDLE,
  // Provided by VK_EXT_descriptor_indexing
    VK_ERROR_FRAGMENTATION_EXT = VK_ERROR_FRAGMENTATION,
  // Provided by VK_EXT_global_priority
    VK_ERROR_NOT_PERMITTED_EXT = VK_ERROR_NOT_PERMITTED,
  // Provided by VK_KHR_global_priority
    VK_ERROR_NOT_PERMITTED_KHR = VK_ERROR_NOT_PERMITTED,
  // Provided by VK_EXT_buffer_device_address
    VK_ERROR_INVALID_DEVICE_ADDRESS_EXT = VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS,
  // Provided by VK_KHR_buffer_device_address
    VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR = VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_PIPELINE_COMPILE_REQUIRED_EXT = VK_PIPELINE_COMPILE_REQUIRED,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_ERROR_PIPELINE_COMPILE_REQUIRED_EXT = VK_PIPELINE_COMPILE_REQUIRED,
  // Provided by VK_EXT_shader_object
  // VK_ERROR_INCOMPATIBLE_SHADER_BINARY_EXT is a legacy alias
    VK_ERROR_INCOMPATIBLE_SHADER_BINARY_EXT = VK_INCOMPATIBLE_SHADER_BINARY_EXT,
} VkResult;

Success Codes

* 
[VK_SUCCESS](#VkResult) Command successfully completed

* 
[VK_NOT_READY](#VkResult) A fence or query has not yet completed

* 
[VK_TIMEOUT](#VkResult) A wait operation has not completed in the specified
time

* 
[VK_EVENT_SET](#VkResult) An event is signaled

* 
[VK_EVENT_RESET](#VkResult) An event is unsignaled

* 
[VK_INCOMPLETE](#VkResult) A return array was too small for the result

* 
[VK_SUBOPTIMAL_KHR](#VkResult) A swapchain no longer matches the surface
properties exactly, but **can** still be used to present to the surface
successfully.

* 
[VK_THREAD_IDLE_KHR](#VkResult) A deferred operation is not complete but there
is currently no work for this thread to do at the time of this call.

* 
[VK_THREAD_DONE_KHR](#VkResult) A deferred operation is not complete but there
is no work remaining to assign to additional threads.

* 
[VK_OPERATION_DEFERRED_KHR](#VkResult) A deferred operation was requested and
at least some of the work was deferred.

* 
[VK_OPERATION_NOT_DEFERRED_KHR](#VkResult) A deferred operation was requested
and no operations were deferred.

* 
[VK_PIPELINE_COMPILE_REQUIRED](#VkResult) A requested pipeline creation would
have required compilation, but the application requested compilation to
not be performed.

* 
[VK_PIPELINE_BINARY_MISSING_KHR](#VkResult) The application attempted to create
a pipeline binary by querying an internal cache, but the internal cache
entry did not exist.

* 
[VK_INCOMPATIBLE_SHADER_BINARY_EXT](#VkResult) The provided binary shader code
is not compatible with this device.

|  | In the initial version of the `[VK_EXT_shader_object](../appendices/extensions.html#VK_EXT_shader_object)` extension, this
| --- | --- |
return code was named [VK_ERROR_INCOMPATIBLE_SHADER_BINARY_EXT](#VkResult) and
improperly described as an error code.
The name has been changed, but the old name is retained as an alias for
compatibility with old code. |

Error Codes

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](#VkResult) A host memory allocation has failed.

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](#VkResult) A device memory allocation has
failed.

* 
[VK_ERROR_INITIALIZATION_FAILED](#VkResult) Initialization of an object could
not be completed for implementation-specific reasons.

* 
[VK_ERROR_DEVICE_LOST](#VkResult) The logical or physical device has been lost.
See [Lost Device](devsandqueues.html#devsandqueues-lost-device)

* 
[VK_ERROR_MEMORY_MAP_FAILED](#VkResult) Mapping of a memory object has failed.

* 
[VK_ERROR_LAYER_NOT_PRESENT](#VkResult) A requested layer is not present or
could not be loaded.

* 
[VK_ERROR_EXTENSION_NOT_PRESENT](#VkResult) A requested extension is not
supported.

* 
[VK_ERROR_FEATURE_NOT_PRESENT](#VkResult) A requested feature is not supported.

* 
[VK_ERROR_INCOMPATIBLE_DRIVER](#VkResult) The requested version of Vulkan is
not supported by the driver or is otherwise incompatible for
implementation-specific reasons.

* 
[VK_ERROR_TOO_MANY_OBJECTS](#VkResult) Too many objects of the type have
already been created.

* 
[VK_ERROR_FORMAT_NOT_SUPPORTED](#VkResult) A requested format is not supported
on this device.

* 
[VK_ERROR_FRAGMENTED_POOL](#VkResult) A pool allocation has failed due to
fragmentation of the pool’s memory.
This **must** only be returned if no attempt to allocate host or device
memory was made to accommodate the new allocation.
This **should** be returned in preference to
[VK_ERROR_OUT_OF_POOL_MEMORY](#VkResult), but only if the implementation is
certain that the pool allocation failure was due to fragmentation.

* 
[VK_ERROR_SURFACE_LOST_KHR](#VkResult) A surface is no longer available.

* 
[VK_ERROR_NATIVE_WINDOW_IN_USE_KHR](#VkResult) The requested window is already
in use by Vulkan or another API in a manner which prevents it from being
used again.

* 
[VK_ERROR_OUT_OF_DATE_KHR](#VkResult) A surface has changed in such a way that
it is no longer compatible with the swapchain, and further presentation
requests using the swapchain will fail.
Applications **must** query the new surface properties and recreate their
swapchain if they wish to continue presenting to the surface.

* 
[VK_ERROR_INCOMPATIBLE_DISPLAY_KHR](#VkResult) The display used by a swapchain
does not use the same presentable image layout, or is incompatible in a
way that prevents sharing an image.

* 
[VK_ERROR_INVALID_SHADER_NV](#VkResult) One or more shaders failed to compile
or link.
More details are reported back to the application via
`[VK_EXT_debug_report](../appendices/extensions.html#VK_EXT_debug_report)` if enabled.

* 
[VK_ERROR_OUT_OF_POOL_MEMORY](#VkResult) A pool memory allocation has failed.
This **must** only be returned if no attempt to allocate host or device
memory was made to accommodate the new allocation.
If the failure was definitely due to fragmentation of the pool,
[VK_ERROR_FRAGMENTED_POOL](#VkResult) **should** be returned instead.

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](#VkResult) An external handle is not a valid
handle of the specified type.

* 
[VK_ERROR_FRAGMENTATION](#VkResult) A descriptor pool creation has failed due
to fragmentation.

* 
[VK_ERROR_INVALID_DEVICE_ADDRESS_EXT](#VkResult) A buffer creation failed
because the requested address is not available.

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](#VkResult) A buffer creation
or memory allocation
failed because the requested address is not available.
A shader group handle assignment failed because the requested shader
group handle information is no longer valid.

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](#VkResult) An operation on a
swapchain created with
[VK_FULL_SCREEN_EXCLUSIVE_APPLICATION_CONTROLLED_EXT](VK_KHR_surface/wsi.html#VkFullScreenExclusiveEXT) failed as it
did not have exclusive full-screen access.
This **may** occur due to implementation-dependent reasons, outside of the
application’s control.

* 
[VK_ERROR_VALIDATION_FAILED](#VkResult) A command failed because invalid usage
was detected by the implementation or a validation layer.
This **may** result in the command not being dispatched to the ICD.

* 
[VK_ERROR_COMPRESSION_EXHAUSTED_EXT](#VkResult) An image creation failed
because internal resources required for compression are exhausted.
This **must** only be returned when fixed-rate compression is requested.

* 
[VK_ERROR_IMAGE_USAGE_NOT_SUPPORTED_KHR](#VkResult) The requested
[VkImageUsageFlags](resources.html#VkImageUsageFlags) are not supported.

* 
[VK_ERROR_VIDEO_PICTURE_LAYOUT_NOT_SUPPORTED_KHR](#VkResult) The requested
video picture layout is not supported.

* 
[VK_ERROR_VIDEO_PROFILE_OPERATION_NOT_SUPPORTED_KHR](#VkResult) A video profile
operation specified via
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR)::`videoCodecOperation` is not supported.

* 
[VK_ERROR_VIDEO_PROFILE_FORMAT_NOT_SUPPORTED_KHR](#VkResult) Format parameters
in a requested [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) chain are not supported.

* 
[VK_ERROR_VIDEO_PROFILE_CODEC_NOT_SUPPORTED_KHR](#VkResult) Codec-specific
parameters in a requested [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) chain are not
supported.

* 
[VK_ERROR_VIDEO_STD_VERSION_NOT_SUPPORTED_KHR](#VkResult) The specified video
Std header version is not supported.

* 
[VK_ERROR_INVALID_VIDEO_STD_PARAMETERS_KHR](#VkResult) The specified Video Std
parameters do not adhere to the syntactic or semantic requirements of
the used video compression standard, or values derived from parameters
according to the rules defined by the used video compression standard do
not adhere to the capabilities of the video compression standard or the
implementation.

* 
[VK_ERROR_NOT_PERMITTED](#VkResult) The driver implementation has denied a
request to acquire a priority above the default priority
([VK_QUEUE_GLOBAL_PRIORITY_MEDIUM_EXT](devsandqueues.html#VkQueueGlobalPriorityEXT)) because the application does
not have sufficient privileges.

* 
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](#VkResult) The application did not provide
enough space to return all the required data.

* 
[VK_ERROR_UNKNOWN](#VkResult) An unknown error has occurred; either the
application has provided invalid input, or an implementation failure has
occurred.

If a command returns a runtime error, unless otherwise specified any output
parameters will have **undefined** contents, except that if the output
parameter is a structure with `sType` and `pNext` fields, those
fields will be unmodified.
Any structures chained from `pNext` will also have **undefined** contents,
except that `sType` and `pNext` will be unmodified.

`VK_ERROR_OUT_OF_*_MEMORY` errors do not modify any currently existing
Vulkan objects.
Objects that have already been successfully created **can** still be used by
the application.

|  | As a general rule, `Free`, `Release`, and `Reset` commands do
| --- | --- |
not return [VK_ERROR_OUT_OF_HOST_MEMORY](#VkResult), while any other command with a
return code **may** return it.
Any exceptions from this rule are described for those commands. |

[VK_ERROR_UNKNOWN](#VkResult) will be returned by an implementation when an
unexpected error occurs that cannot be attributed to valid behavior of the
application and implementation.
Under these conditions, it **may** be returned from any command returning a
[VkResult](#VkResult).

|  | [VK_ERROR_UNKNOWN](#VkResult) is not expected to ever be returned if the
| --- | --- |
application behavior is valid, and if the implementation is bug-free.
If [VK_ERROR_UNKNOWN](#VkResult) is returned, the application should be checked
against the latest validation layers to verify correct behavior as much as
possible.
If no issues are identified it could be an implementation issue, and the
implementor should be contacted for support. |

Any command returning a [VkResult](#VkResult) **may** return
[VK_ERROR_VALIDATION_FAILED](#VkResult) if a violation of valid usage is detected.

Performance-critical commands generally do not have return codes.
If a runtime error occurs in such commands, the implementation will defer
reporting the error until a specified point.
For commands that record into command buffers (`vkCmd*`) runtime errors
are reported by `vkEndCommandBuffer`.

Implementations normally perform computations in floating-point, and **must**
meet the range and precision requirements defined under “Floating-Point
Computation” below.

These requirements only apply to computations performed in Vulkan operations
outside of shader execution, such as texture image specification and
sampling, and per-fragment operations.
Range and precision requirements during shader execution differ, and are
specified by the [Precision and Operation of SPIR-V Instructions](../appendices/spirvenv.html#spirvenv-precision-operation) section.

In some cases, the representation and/or precision of operations is
implicitly limited by the specified format of vertex or texel data consumed
by Vulkan.
Specific floating-point formats are described later in this section.

Most floating-point computation is performed in SPIR-V shader modules.
The properties of computation within shaders are constrained as defined by
the [Precision and Operation of SPIR-V Instructions](../appendices/spirvenv.html#spirvenv-precision-operation) section.

Some floating-point computation is performed outside of shaders, such as
viewport and depth range calculations.
For these computations, we do not specify how floating-point numbers are to
be represented, or the details of how operations on them are performed, but
only place minimal requirements on representation and precision as described
in the remainder of this section.

We require simply that numbers' floating-point parts contain enough bits and
that their exponent fields are large enough so that individual results of
floating-point operations are accurate to about 1 part in 105.
The maximum representable magnitude for all floating-point values **must** be
at least 232.

x × 0 = 0 × x = 0 for any non-infinite and
non-NaN x.

1 × x = x × 1 = x.

x +  0 = 0 +  x = x.

00 = 1.

Occasionally, further requirements will be specified.
Most single-precision floating-point formats meet these requirements.

The special values Inf and -Inf encode values with magnitudes
too large to be represented; the special value NaN encodes “Not A
Number” values resulting from **undefined** arithmetic operations such as
0 / 0.
Implementations **may** support Inf and NaN in their floating-point
computations.
Any computation which does not support either Inf or NaN, for
which that value is an input or output will yield an **undefined** value.

When a value is converted to a defined floating-point representation, finite
values falling between two representable finite values are rounded to one or
the other.
The rounding mode is not defined.
Finite values whose magnitude is larger than that of any representable
finite value may be rounded either to the closest representable finite value
or to the appropriately signed infinity.
For unsigned destination formats any negative values are converted to zero.
Positive infinity is converted to positive infinity; negative infinity is
converted to negative infinity in signed formats and to zero in unsigned
formats; and any NaN is converted to a NaN.

16-bit floating-point numbers are defined in the “16-bit floating-point
numbers” section of the [Khronos Data Format Specification](introduction.html#data-format).

Unsigned 11-bit floating-point numbers are defined in the “Unsigned 11-bit
floating-point numbers” section of the [Khronos Data Format Specification](introduction.html#data-format).

Unsigned 10-bit floating-point numbers are defined in the “Unsigned 10-bit
floating-point numbers” section of the [Khronos Data Format Specification](introduction.html#data-format).

An 8-bit boolean uses the following representation for `true` and `false`:

* 
Zero to represent `false`

* 
Any non-zero value to represent `true`

Any representable floating-point value in the appropriate format is legal as
input to a Vulkan command that requires floating-point data.
The result of providing a value that is not a floating-point number to such
a command is unspecified, but **must** not lead to Vulkan interruption or
termination.
For example, providing a negative zero (where applicable) or a denormalized
number to a Vulkan command **must** yield deterministic results, while
providing a NaN or Inf yields unspecified results.

Some calculations require division.
In such cases (including implied divisions performed by vector
normalization), division by zero produces an unspecified result but **must**
not lead to Vulkan interruption or termination.

When generic vertex attributes and pixel color or depth *components* are
represented as integers, they are often (but not always) considered to be
*normalized*.
Normalized integer values are treated specially when being converted to and
from floating-point values, and are usually referred to as *normalized
fixed-point*.

In the remainder of this section, b denotes the bit width of the
fixed-point integer representation.
When the integer is one of the types defined by the API, b is the bit
width of that type.
When the integer comes from an [image](resources.html#resources-images) containing color
or depth component texels, b is the number of bits allocated to that
component in its [specified image format](formats.html#formats).

The signed and unsigned fixed-point representations are assumed to be
b-bit binary two’s-complement integers and binary unsigned integers,
respectively.

Unsigned normalized fixed-point integers represent numbers in the range
[0,1].
The conversion from an unsigned normalized fixed-point value c to the
corresponding floating-point value f is defined as

  

  

Signed normalized fixed-point integers represent numbers in the range
[-1,1].
The conversion from a signed normalized fixed-point value c to the
corresponding floating-point value f is performed using

  

  

Only the range [-2b-1 +  1, 2b-1 - 1] is used to represent
signed fixed-point values in the range [-1,1].
For example, if b = 8, then the integer value -127 corresponds
to -1.0 and the value 127 corresponds to 1.0.
This equation is used everywhere that signed normalized fixed-point values
are converted to floating-point.

Note that while zero is exactly expressible in this representation, one
value (-128 in the example) is outside the representable range, and
implementations **must** clamp it to -1.0.
Where the value is subject to further processing by the implementation, e.g.
during texture filtering, values less than -1.0 **may** be used but the
result **must** be clamped before the value is returned to shaders.

The conversion from a floating-point value f to the corresponding
unsigned normalized fixed-point value c is defined by first clamping
f to the range [0,1], then computing

c = convertFloatToUint(f × (2b - 1), b)

where convertFloatToUint(r,b) returns one of the two unsigned binary
integer values with exactly b bits which are closest to the
floating-point value r.
Implementations **should** round to nearest.
If r is equal to an integer, then that integer value **must** be
returned.
In particular, if f is equal to 0.0 or 1.0, then c **must** be
assigned 0 or 2b - 1, respectively.

The conversion from a floating-point value f to the corresponding
signed normalized fixed-point value c is performed by clamping f
to the range [-1,1], then computing

c = convertFloatToInt(f × (2b-1 - 1), b)

where convertFloatToInt(r,b) returns one of the two signed
two’s-complement binary integer values with exactly b bits which are
closest to the floating-point value r.
Implementations **should** round to nearest.
If r is equal to an integer, then that integer value **must** be
returned.
In particular, if f is equal to -1.0, 0.0, or 1.0, then c **must**
be assigned -(2b-1 - 1), 0, or 2b-1 - 1, respectively.

This equation is used everywhere that floating-point values are converted to
signed normalized fixed-point.

Strings passed into and returned from Vulkan API commands are usually
defined to be null-terminated and UTF-8 encoded.

|  | Exceptions to this rule exist only when strings are defined or used by
| --- | --- |
operating system APIs where that OS has a different convention.
For example, [VkExportMemoryWin32HandleInfoKHR](memory.html#VkExportMemoryWin32HandleInfoKHR)::`name` is a
null-terminated UTF-16 encoded string used in conjunction with Windows
handles. |

When a UTF-8 string is **returned from** a Vulkan API query, it is returned in
a fixed-length buffer of C `char`.
For example, a string returned in
[VkPhysicalDeviceProperties](devsandqueues.html#VkPhysicalDeviceProperties)::`deviceName` has maximum length
[VK_MAX_PHYSICAL_DEVICE_NAME_SIZE](devsandqueues.html#VK_MAX_PHYSICAL_DEVICE_NAME_SIZE), and a string returned in
[VkExtensionProperties](extensions.html#VkExtensionProperties)::`extensionName` has maximum length
[VK_MAX_EXTENSION_NAME_SIZE](extensions.html#VK_MAX_EXTENSION_NAME_SIZE).
The string, **including** its null terminator, will always fit completely
within this buffer.
If the string is shorter than the buffer size, the contents of `char` in
the buffer following the null terminator are **undefined**.

When a UTF-8 string is **passed into** a Vulkan API, such as
[VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo)::`ppEnabledExtensionNames`, there is no
explicit limit on the length of that string.
However, the string **must** contain a valid UTF-8 encoded string and **must** be
null-terminated.

Some types of Vulkan objects are used in many different structures and
command parameters, and are described here.
These types include *offsets*, *extents*, and *rectangles*.

Offsets are used to describe a pixel location within an image or
framebuffer, as an (x,y) location for two-dimensional images, or an (x,y,z)
location for three-dimensional images.

A two-dimensional offset is defined by the structure:

// Provided by VK_VERSION_1_0
typedef struct VkOffset2D {
    int32_t    x;
    int32_t    y;
} VkOffset2D;

* 
`x` is the x offset.

* 
`y` is the y offset.

A three-dimensional offset is defined by the structure:

// Provided by VK_VERSION_1_0
typedef struct VkOffset3D {
    int32_t    x;
    int32_t    y;
    int32_t    z;
} VkOffset3D;

* 
`x` is the x offset.

* 
`y` is the y offset.

* 
`z` is the z offset.

Extents are used to describe the size of a rectangular region of pixels
within an image or framebuffer, as (width,height) for two-dimensional
images, or as (width,height,depth) for three-dimensional images.

A two-dimensional extent is defined by the structure:

// Provided by VK_VERSION_1_0
typedef struct VkExtent2D {
    uint32_t    width;
    uint32_t    height;
} VkExtent2D;

* 
`width` is the width of the extent.

* 
`height` is the height of the extent.

A three-dimensional extent is defined by the structure:

// Provided by VK_VERSION_1_0
typedef struct VkExtent3D {
    uint32_t    width;
    uint32_t    height;
    uint32_t    depth;
} VkExtent3D;

* 
`width` is the width of the extent.

* 
`height` is the height of the extent.

* 
`depth` is the depth of the extent.

Rectangles are used to describe a specified rectangular region of pixels
within an image or framebuffer.
Rectangles include both an offset and an extent of the same dimensionality,
as described above.
Two-dimensional rectangles are defined by the structure

// Provided by VK_VERSION_1_0
typedef struct VkRect2D {
    VkOffset2D    offset;
    VkExtent2D    extent;
} VkRect2D;

* 
`offset` is a [VkOffset2D](#VkOffset2D) specifying the rectangle offset.

* 
`extent` is a [VkExtent2D](#VkExtent2D) specifying the rectangle extent.

A host address range indicates a range of host memory.

// Provided by VK_EXT_descriptor_heap
typedef struct VkHostAddressRangeEXT {
    void*     address;
    size_t    size;
} VkHostAddressRangeEXT;

* 
`address` is a host memory address.

* 
`size` is the size of the range.

Valid Usage (Implicit)

* 
[](#VUID-VkHostAddressRangeEXT-address-parameter) VUID-VkHostAddressRangeEXT-address-parameter

 `address` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-VkHostAddressRangeEXT-size-arraylength) VUID-VkHostAddressRangeEXT-size-arraylength

 `size` **must** be greater than `0`

A constant host address range indicates a range of host memory that cannot
be altered.

// Provided by VK_EXT_descriptor_heap
typedef struct VkHostAddressRangeConstEXT {
    const void*    address;
    size_t         size;
} VkHostAddressRangeConstEXT;

* 
`address` is a read-only host memory address.

* 
`size` is the size of the range.

Valid Usage (Implicit)

* 
[](#VUID-VkHostAddressRangeConstEXT-address-parameter) VUID-VkHostAddressRangeConstEXT-address-parameter

 `address` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-VkHostAddressRangeConstEXT-size-arraylength) VUID-VkHostAddressRangeConstEXT-size-arraylength

 `size` **must** be greater than `0`

A device address range indicates a sized range of device memory.

// Provided by VK_KHR_device_address_commands
typedef struct VkDeviceAddressRangeKHR {
    VkDeviceAddress    address;
    VkDeviceSize       size;
} VkDeviceAddressRangeKHR;

// Provided by VK_EXT_descriptor_heap
// Equivalent to VkDeviceAddressRangeKHR
typedef VkDeviceAddressRangeKHR VkDeviceAddressRangeEXT;

* 
`address` is 0 or a `VkDeviceAddress` specifying the start of
the range.

* 
`size` is a `VkDeviceSize` specifying the size of the range.

Valid Usage

* 
[](#VUID-VkDeviceAddressRangeKHR-size-11411) VUID-VkDeviceAddressRangeKHR-size-11411

If `size` is not 0, `address` **must** not be 0

* 
[](#VUID-VkDeviceAddressRangeKHR-address-11365) VUID-VkDeviceAddressRangeKHR-address-11365

The sum of `address` and `size` **must** be less than or equal to
the sum of an address retrieved from a [VkBuffer](resources.html#VkBuffer) and the value of
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`size` used to create that [VkBuffer](resources.html#VkBuffer)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceAddressRangeKHR-address-parameter) VUID-VkDeviceAddressRangeKHR-address-parameter

 If `address` is not `0`, `address` **must** be a valid `VkDeviceAddress` value

A strided device address range is defined by the structure:

// Provided by VK_KHR_copy_memory_indirect, VK_KHR_device_address_commands
typedef struct VkStridedDeviceAddressRangeKHR {
    VkDeviceAddress    address;
    VkDeviceSize       size;
    VkDeviceSize       stride;
} VkStridedDeviceAddressRangeKHR;

* 
`address` is a `VkDeviceAddress` specifying the start of the
range.

* 
`size` is a `VkDeviceSize` specifying the size of the range.

* 
`stride` is a `VkDeviceSize` specifying the stride of
elements over the range.

Valid Usage

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-size-11411) VUID-VkStridedDeviceAddressRangeKHR-size-11411

If `size` is not 0, `address` **must** not be 0

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-address-11365) VUID-VkStridedDeviceAddressRangeKHR-address-11365

The sum of `address` and `size` **must** be less than or equal to
the sum of an address retrieved from a [VkBuffer](resources.html#VkBuffer) and the value of
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`size` used to create that [VkBuffer](resources.html#VkBuffer)

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-stride-10957) VUID-VkStridedDeviceAddressRangeKHR-stride-10957

`stride` **must** be less than or equal to `size`

Valid Usage (Implicit)

* 
[](#VUID-VkStridedDeviceAddressRangeKHR-address-parameter) VUID-VkStridedDeviceAddressRangeKHR-address-parameter

 If `address` is not `0`, `address` **must** be a valid `VkDeviceAddress` value

Many Vulkan commands need additional information about an address range;
this **may** be provided by the following flags.

Bits which **can** be set in a [VkAddressCommandFlagsKHR](#VkAddressCommandFlagsKHR) mask are:

// Provided by VK_KHR_device_address_commands
typedef enum VkAddressCommandFlagBitsKHR {
    VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR = 0x00000001,
    VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR = 0x00000002,
    VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR = 0x00000004,
    VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR = 0x00000008,
  // Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
    VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR = 0x00000010,
  // Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
    VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR = 0x00000020,
} VkAddressCommandFlagBitsKHR;

* 
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](#VkAddressCommandFlagBitsKHR) specifies that an address
range is allocated from protected memory.

* 
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](#VkAddressCommandFlagBitsKHR) specifies that an address
range will be fully bound to physical memory when accessed.

* 
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR) specifies that all
buffers containing any part of an address range were created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage.

* 
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR) specifies
that whether buffers containing an any part of an address range were
created with [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage or not is
unknown.

* 
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR)
specifies that all buffers containing any part of an address range are
allocated with the
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage.

* 
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR)
specifies that whether buffers containing an any part of an address
range were created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage or not is
unknown.

If neither [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR) nor
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR) are specified,
the address range **must** not be aliased with any buffer allocated with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits).
If neither [VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR)
nor [VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](#VkAddressCommandFlagBitsKHR)
are specified, the address range **must** not be aliased with any buffer
allocated with the [VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits).

|  | Buffers can return overlapping address ranges if they are bound to
| --- | --- |
overlapping ranges of a [VkDeviceMemory](memory.html#VkDeviceMemory) object.
Applications should ensure that if they do this kind of aliasing, that they
consistently either include or do not include
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits)
and [VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)
on aliased buffers when considering these flags. |

// Provided by VK_KHR_device_address_commands
typedef VkFlags VkAddressCommandFlagsKHR;

`VkAddressCommandFlagsKHR` is a bitmask type for setting a mask of zero
or more [VkAddressCommandFlagBitsKHR](#VkAddressCommandFlagBitsKHR).

Each value corresponds to a particular structure with a `sType` member
with a matching name.
As a general rule, the name of each [VkStructureType](#VkStructureType) value is obtained
by taking the name of the structure, stripping the leading `Vk`,
prefixing each capital letter except the first with `_`, converting the
entire resulting string to upper case, and prefixing it with
`VK_STRUCTURE_TYPE_`.
For example, structures of type [VkImageCreateInfo](resources.html#VkImageCreateInfo) correspond to a
[VkStructureType](#VkStructureType) value of [VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO](#VkStructureType),
and thus a structure of this type **must** have its `sType` member set to
this value before it is passed to the API.

The values [VK_STRUCTURE_TYPE_LOADER_INSTANCE_CREATE_INFO](#VkStructureType) and
[VK_STRUCTURE_TYPE_LOADER_DEVICE_CREATE_INFO](#VkStructureType) are reserved for internal
use by the loader, and do not have corresponding Vulkan structures in this
Specification.

Structure types supported by the Vulkan API include:

// Provided by VK_VERSION_1_0
typedef enum VkStructureType {
    VK_STRUCTURE_TYPE_APPLICATION_INFO = 0,
    VK_STRUCTURE_TYPE_INSTANCE_CREATE_INFO = 1,
    VK_STRUCTURE_TYPE_DEVICE_QUEUE_CREATE_INFO = 2,
    VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO = 3,
    VK_STRUCTURE_TYPE_SUBMIT_INFO = 4,
    VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO = 5,
    VK_STRUCTURE_TYPE_MAPPED_MEMORY_RANGE = 6,
    VK_STRUCTURE_TYPE_BIND_SPARSE_INFO = 7,
    VK_STRUCTURE_TYPE_FENCE_CREATE_INFO = 8,
    VK_STRUCTURE_TYPE_SEMAPHORE_CREATE_INFO = 9,
    VK_STRUCTURE_TYPE_EVENT_CREATE_INFO = 10,
    VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO = 11,
    VK_STRUCTURE_TYPE_BUFFER_CREATE_INFO = 12,
    VK_STRUCTURE_TYPE_BUFFER_VIEW_CREATE_INFO = 13,
    VK_STRUCTURE_TYPE_IMAGE_CREATE_INFO = 14,
    VK_STRUCTURE_TYPE_IMAGE_VIEW_CREATE_INFO = 15,
    VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO = 16,
    VK_STRUCTURE_TYPE_PIPELINE_CACHE_CREATE_INFO = 17,
    VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_CREATE_INFO = 18,
    VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_STATE_CREATE_INFO = 19,
    VK_STRUCTURE_TYPE_PIPELINE_INPUT_ASSEMBLY_STATE_CREATE_INFO = 20,
    VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_STATE_CREATE_INFO = 21,
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_STATE_CREATE_INFO = 22,
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_CREATE_INFO = 23,
    VK_STRUCTURE_TYPE_PIPELINE_MULTISAMPLE_STATE_CREATE_INFO = 24,
    VK_STRUCTURE_TYPE_PIPELINE_DEPTH_STENCIL_STATE_CREATE_INFO = 25,
    VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_STATE_CREATE_INFO = 26,
    VK_STRUCTURE_TYPE_PIPELINE_DYNAMIC_STATE_CREATE_INFO = 27,
    VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_CREATE_INFO = 28,
    VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_CREATE_INFO = 29,
    VK_STRUCTURE_TYPE_PIPELINE_LAYOUT_CREATE_INFO = 30,
    VK_STRUCTURE_TYPE_SAMPLER_CREATE_INFO = 31,
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_CREATE_INFO = 32,
    VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_CREATE_INFO = 33,
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_ALLOCATE_INFO = 34,
    VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET = 35,
    VK_STRUCTURE_TYPE_COPY_DESCRIPTOR_SET = 36,
    VK_STRUCTURE_TYPE_FRAMEBUFFER_CREATE_INFO = 37,
    VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO = 38,
    VK_STRUCTURE_TYPE_COMMAND_POOL_CREATE_INFO = 39,
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_ALLOCATE_INFO = 40,
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_INFO = 41,
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_BEGIN_INFO = 42,
    VK_STRUCTURE_TYPE_RENDER_PASS_BEGIN_INFO = 43,
    VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER = 44,
    VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER = 45,
    VK_STRUCTURE_TYPE_MEMORY_BARRIER = 46,
    VK_STRUCTURE_TYPE_LOADER_INSTANCE_CREATE_INFO = 47,
    VK_STRUCTURE_TYPE_LOADER_DEVICE_CREATE_INFO = 48,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_INFO = 1000157000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO = 1000157001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS = 1000127000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO = 1000127001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO = 1000060000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO = 1000060004,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DEVICE_GROUP_SUBMIT_INFO = 1000060005,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO = 1000060006,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO = 1000060013,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO = 1000060014,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES = 1000070000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO = 1000070001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2 = 1000146000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2 = 1000146001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2 = 1000146002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2 = 1000146003,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2 = 1000146004,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2 = 1000059000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2 = 1000059001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2 = 1000059002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2 = 1000059003,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2 = 1000059004,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2 = 1000059005,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2 = 1000059006,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2 = 1000059007,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2 = 1000059008,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO = 1000117002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PROTECTED_SUBMIT_INFO = 1000145000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_FEATURES = 1000145001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROTECTED_MEMORY_PROPERTIES = 1000145002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DEVICE_QUEUE_INFO_2 = 1000145003,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO = 1000071000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES = 1000071001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO = 1000071002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES = 1000071003,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES = 1000071004,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO = 1000072000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO = 1000072001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO = 1000072002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FENCE_INFO = 1000112000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXTERNAL_FENCE_PROPERTIES = 1000112001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO = 1000113000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO = 1000077000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO = 1000076000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES = 1000076001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_PROPERTIES = 1000094000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES = 1000083000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES = 1000120000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO = 1000085000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES = 1000168000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT = 1000168001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO = 1000156000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO = 1000156001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO = 1000156002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO = 1000156003,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES = 1000156004,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES = 1000156005,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_DEVICE_GROUP_RENDER_PASS_BEGIN_INFO = 1000060003,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_POINT_CLIPPING_PROPERTIES = 1000117000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO = 1000117001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_DOMAIN_ORIGIN_STATE_CREATE_INFO = 1000117003,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_RENDER_PASS_MULTIVIEW_CREATE_INFO = 1000053000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES = 1000053001,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PROPERTIES = 1000053002,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETERS_FEATURES = 1000063000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES = 1000196000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES = 49,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_PROPERTIES = 50,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_FEATURES = 51,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_PROPERTIES = 52,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO = 1000147000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_MEMORY_MODEL_FEATURES = 1000211000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_QUERY_RESET_FEATURES = 1000261000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_FEATURES = 1000207000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_PROPERTIES = 1000207001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO = 1000207002,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO = 1000207003,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO = 1000207004,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO = 1000207005,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES = 1000257000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO = 1000244001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO = 1000257002,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO = 1000257003,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO = 1000257004,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_8BIT_STORAGE_FEATURES = 1000177000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_INT64_FEATURES = 1000180000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES = 1000082000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES = 1000197000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO = 1000161000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES = 1000161001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES = 1000161002,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO = 1000161003,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT = 1000161004,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCALAR_BLOCK_LAYOUT_FEATURES = 1000221000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_FILTER_MINMAX_PROPERTIES = 1000130000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO = 1000130001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFORM_BUFFER_STANDARD_LAYOUT_FEATURES = 1000253000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES = 1000175000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2 = 1000109000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2 = 1000109001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2 = 1000109002,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2 = 1000109003,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2 = 1000109004,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO = 1000109005,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SUBPASS_END_INFO = 1000109006,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES = 1000199000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE = 1000199001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO = 1000246000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGELESS_FRAMEBUFFER_FEATURES = 1000108000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO = 1000108001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO = 1000108002,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO = 1000108003,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SEPARATE_DEPTH_STENCIL_LAYOUTS_FEATURES = 1000241000,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT = 1000241001,
  // Provided by VK_VERSION_1_2
    VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT = 1000241002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_FEATURES = 53,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_PROPERTIES = 54,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES = 1000245000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_FEATURES = 1000295000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO = 1000295001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO = 1000295002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_MEMORY_BARRIER_2 = 1000314000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2 = 1000314001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2 = 1000314002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_DEPENDENCY_INFO = 1000314003,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_SUBMIT_INFO_2 = 1000314004,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO = 1000314005,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO = 1000314006,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SYNCHRONIZATION_2_FEATURES = 1000314007,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_COPY_BUFFER_INFO_2 = 1000337000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_COPY_IMAGE_INFO_2 = 1000337001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_COPY_BUFFER_TO_IMAGE_INFO_2 = 1000337002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_COPY_IMAGE_TO_BUFFER_INFO_2 = 1000337003,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_BUFFER_COPY_2 = 1000337006,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_IMAGE_COPY_2 = 1000337007,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_BUFFER_IMAGE_COPY_2 = 1000337009,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES = 1000066000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3 = 1000360000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_FEATURES = 1000413000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES = 1000413001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS = 1000413002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS = 1000413003,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO = 1000192000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TERMINATE_INVOCATION_FEATURES = 1000215000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DEMOTE_TO_HELPER_INVOCATION_FEATURES = 1000276000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES = 1000297000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES = 1000325000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES = 1000335000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES = 1000225000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO = 1000225001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES = 1000225002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_FEATURES = 1000138000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES = 1000138001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK = 1000138002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO = 1000138003,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_FEATURES = 1000280000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_PROPERTIES = 1000280001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES = 1000281001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_BLIT_IMAGE_INFO_2 = 1000337004,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_RESOLVE_IMAGE_INFO_2 = 1000337005,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_IMAGE_BLIT_2 = 1000337008,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_IMAGE_RESOLVE_2 = 1000337010,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_RENDERING_INFO = 1000044000,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO = 1000044001,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO = 1000044002,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES = 1000044003,
  // Provided by VK_VERSION_1_3
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO = 1000044004,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_FEATURES = 55,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_PROPERTIES = 56,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO = 1000174000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES = 1000388000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES = 1000388001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES = 1000265000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_MEMORY_MAP_INFO = 1000271000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO = 1000271001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES = 1000470000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES = 1000470001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO = 1000470004,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2 = 1000338002,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2 = 1000338003,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO = 1000470006,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES = 1000545000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES = 1000545001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS = 1000545002,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES = 1000270000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES = 1000270001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_MEMORY_TO_IMAGE_COPY = 1000270002,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_IMAGE_TO_MEMORY_COPY = 1000270003,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_COPY_IMAGE_TO_MEMORY_INFO = 1000270004,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INFO = 1000270005,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO = 1000270006,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_COPY_IMAGE_TO_IMAGE_INFO = 1000270007,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE = 1000270008,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY = 1000270009,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES = 1000416000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT_CONTROLS_2_FEATURES = 1000528000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EXPECT_ASSUME_FEATURES = 1000544000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO = 1000470005,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES = 1000080000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_SETS_INFO = 1000545003,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO = 1000545004,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO = 1000545005,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO = 1000545006,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROTECTED_ACCESS_FEATURES = 1000466000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO = 1000068000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES = 1000068001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES = 1000068002,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES = 1000259000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO = 1000259001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES = 1000259002,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES = 1000525000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO = 1000190001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES = 1000190002,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_RENDERING_AREA_INFO = 1000470003,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_LOCAL_READ_FEATURES = 1000232000,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO = 1000232001,
  // Provided by VK_VERSION_1_4
    VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO = 1000232002,
  // Provided by VK_KHR_swapchain
    VK_STRUCTURE_TYPE_SWAPCHAIN_CREATE_INFO_KHR = 1000001000,
  // Provided by VK_KHR_swapchain
    VK_STRUCTURE_TYPE_PRESENT_INFO_KHR = 1000001001,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
    VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_CAPABILITIES_KHR = 1000060007,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
    VK_STRUCTURE_TYPE_IMAGE_SWAPCHAIN_CREATE_INFO_KHR = 1000060008,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
    VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_SWAPCHAIN_INFO_KHR = 1000060009,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
    VK_STRUCTURE_TYPE_ACQUIRE_NEXT_IMAGE_INFO_KHR = 1000060010,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
    VK_STRUCTURE_TYPE_DEVICE_GROUP_PRESENT_INFO_KHR = 1000060011,
  // Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_swapchain
    VK_STRUCTURE_TYPE_DEVICE_GROUP_SWAPCHAIN_CREATE_INFO_KHR = 1000060012,
  // Provided by VK_KHR_display
    VK_STRUCTURE_TYPE_DISPLAY_MODE_CREATE_INFO_KHR = 1000002000,
  // Provided by VK_KHR_display
    VK_STRUCTURE_TYPE_DISPLAY_SURFACE_CREATE_INFO_KHR = 1000002001,
  // Provided by VK_KHR_display_swapchain
    VK_STRUCTURE_TYPE_DISPLAY_PRESENT_INFO_KHR = 1000003000,
  // Provided by VK_KHR_xlib_surface
    VK_STRUCTURE_TYPE_XLIB_SURFACE_CREATE_INFO_KHR = 1000004000,
  // Provided by VK_KHR_xcb_surface
    VK_STRUCTURE_TYPE_XCB_SURFACE_CREATE_INFO_KHR = 1000005000,
  // Provided by VK_KHR_wayland_surface
    VK_STRUCTURE_TYPE_WAYLAND_SURFACE_CREATE_INFO_KHR = 1000006000,
  // Provided by VK_KHR_android_surface
    VK_STRUCTURE_TYPE_ANDROID_SURFACE_CREATE_INFO_KHR = 1000008000,
  // Provided by VK_KHR_win32_surface
    VK_STRUCTURE_TYPE_WIN32_SURFACE_CREATE_INFO_KHR = 1000009000,
  // Provided by VK_EXT_debug_report
    VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT = 1000011000,
  // Provided by VK_AMD_rasterization_order
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_RASTERIZATION_ORDER_AMD = 1000018000,
  // Provided by VK_EXT_debug_marker
    VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_NAME_INFO_EXT = 1000022000,
  // Provided by VK_EXT_debug_marker
    VK_STRUCTURE_TYPE_DEBUG_MARKER_OBJECT_TAG_INFO_EXT = 1000022001,
  // Provided by VK_EXT_debug_marker
    VK_STRUCTURE_TYPE_DEBUG_MARKER_MARKER_INFO_EXT = 1000022002,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_PROFILE_INFO_KHR = 1000023000,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_CAPABILITIES_KHR = 1000023001,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_PICTURE_RESOURCE_INFO_KHR = 1000023002,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_SESSION_MEMORY_REQUIREMENTS_KHR = 1000023003,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_BIND_VIDEO_SESSION_MEMORY_INFO_KHR = 1000023004,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_SESSION_CREATE_INFO_KHR = 1000023005,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000023006,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_SESSION_PARAMETERS_UPDATE_INFO_KHR = 1000023007,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_BEGIN_CODING_INFO_KHR = 1000023008,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_END_CODING_INFO_KHR = 1000023009,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_CODING_CONTROL_INFO_KHR = 1000023010,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_REFERENCE_SLOT_INFO_KHR = 1000023011,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_VIDEO_PROPERTIES_KHR = 1000023012,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_PROFILE_LIST_INFO_KHR = 1000023013,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_FORMAT_INFO_KHR = 1000023014,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_VIDEO_FORMAT_PROPERTIES_KHR = 1000023015,
  // Provided by VK_KHR_video_queue
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_QUERY_RESULT_STATUS_PROPERTIES_KHR = 1000023016,
  // Provided by VK_KHR_video_decode_queue
    VK_STRUCTURE_TYPE_VIDEO_DECODE_INFO_KHR = 1000024000,
  // Provided by VK_KHR_video_decode_queue
    VK_STRUCTURE_TYPE_VIDEO_DECODE_CAPABILITIES_KHR = 1000024001,
  // Provided by VK_KHR_video_decode_queue
    VK_STRUCTURE_TYPE_VIDEO_DECODE_USAGE_INFO_KHR = 1000024002,
  // Provided by VK_NV_dedicated_allocation
    VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_IMAGE_CREATE_INFO_NV = 1000026000,
  // Provided by VK_NV_dedicated_allocation
    VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_BUFFER_CREATE_INFO_NV = 1000026001,
  // Provided by VK_NV_dedicated_allocation
    VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_MEMORY_ALLOCATE_INFO_NV = 1000026002,
  // Provided by VK_EXT_transform_feedback
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_FEATURES_EXT = 1000028000,
  // Provided by VK_EXT_transform_feedback
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TRANSFORM_FEEDBACK_PROPERTIES_EXT = 1000028001,
  // Provided by VK_EXT_transform_feedback
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_STREAM_CREATE_INFO_EXT = 1000028002,
  // Provided by VK_NVX_binary_import
    VK_STRUCTURE_TYPE_CU_MODULE_CREATE_INFO_NVX = 1000029000,
  // Provided by VK_NVX_binary_import
    VK_STRUCTURE_TYPE_CU_FUNCTION_CREATE_INFO_NVX = 1000029001,
  // Provided by VK_NVX_binary_import
    VK_STRUCTURE_TYPE_CU_LAUNCH_INFO_NVX = 1000029002,
  // Provided by VK_NVX_binary_import
    VK_STRUCTURE_TYPE_CU_MODULE_TEXTURING_MODE_CREATE_INFO_NVX = 1000029004,
  // Provided by VK_NVX_image_view_handle
    VK_STRUCTURE_TYPE_IMAGE_VIEW_HANDLE_INFO_NVX = 1000030000,
  // Provided by VK_NVX_image_view_handle
    VK_STRUCTURE_TYPE_IMAGE_VIEW_ADDRESS_PROPERTIES_NVX = 1000030001,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_CAPABILITIES_KHR = 1000038000,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000038001,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_ADD_INFO_KHR = 1000038002,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_PICTURE_INFO_KHR = 1000038003,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_DPB_SLOT_INFO_KHR = 1000038004,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_NALU_SLICE_INFO_KHR = 1000038005,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_GOP_REMAINING_FRAME_INFO_KHR = 1000038006,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_PROFILE_INFO_KHR = 1000038007,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_RATE_CONTROL_INFO_KHR = 1000038008,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_RATE_CONTROL_LAYER_INFO_KHR = 1000038009,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_CREATE_INFO_KHR = 1000038010,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_QUALITY_LEVEL_PROPERTIES_KHR = 1000038011,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_GET_INFO_KHR = 1000038012,
  // Provided by VK_KHR_video_encode_h264
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_SESSION_PARAMETERS_FEEDBACK_INFO_KHR = 1000038013,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_CAPABILITIES_KHR = 1000039000,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000039001,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_PARAMETERS_ADD_INFO_KHR = 1000039002,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_PICTURE_INFO_KHR = 1000039003,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_DPB_SLOT_INFO_KHR = 1000039004,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_NALU_SLICE_SEGMENT_INFO_KHR = 1000039005,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_GOP_REMAINING_FRAME_INFO_KHR = 1000039006,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_PROFILE_INFO_KHR = 1000039007,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_RATE_CONTROL_INFO_KHR = 1000039009,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_RATE_CONTROL_LAYER_INFO_KHR = 1000039010,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_CREATE_INFO_KHR = 1000039011,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_QUALITY_LEVEL_PROPERTIES_KHR = 1000039012,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_PARAMETERS_GET_INFO_KHR = 1000039013,
  // Provided by VK_KHR_video_encode_h265
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_SESSION_PARAMETERS_FEEDBACK_INFO_KHR = 1000039014,
  // Provided by VK_KHR_video_decode_h264
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_CAPABILITIES_KHR = 1000040000,
  // Provided by VK_KHR_video_decode_h264
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PICTURE_INFO_KHR = 1000040001,
  // Provided by VK_KHR_video_decode_h264
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_PROFILE_INFO_KHR = 1000040003,
  // Provided by VK_KHR_video_decode_h264
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000040004,
  // Provided by VK_KHR_video_decode_h264
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_SESSION_PARAMETERS_ADD_INFO_KHR = 1000040005,
  // Provided by VK_KHR_video_decode_h264
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_DPB_SLOT_INFO_KHR = 1000040006,
  // Provided by VK_AMD_texture_gather_bias_lod
    VK_STRUCTURE_TYPE_TEXTURE_LOD_GATHER_FORMAT_PROPERTIES_AMD = 1000041000,
  // Provided by VK_GGP_stream_descriptor_surface
    VK_STRUCTURE_TYPE_STREAM_DESCRIPTOR_SURFACE_CREATE_INFO_GGP = 1000049000,
  // Provided by VK_NV_corner_sampled_image
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CORNER_SAMPLED_IMAGE_FEATURES_NV = 1000050000,
  // Provided by VK_NV_external_memory
    VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO_NV = 1000056000,
  // Provided by VK_NV_external_memory
    VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO_NV = 1000056001,
  // Provided by VK_NV_external_memory_win32
    VK_STRUCTURE_TYPE_IMPORT_MEMORY_WIN32_HANDLE_INFO_NV = 1000057000,
  // Provided by VK_NV_external_memory_win32
    VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_NV = 1000057001,
  // Provided by VK_NV_win32_keyed_mutex
    VK_STRUCTURE_TYPE_WIN32_KEYED_MUTEX_ACQUIRE_RELEASE_INFO_NV = 1000058000,
  // Provided by VK_EXT_validation_flags
    VK_STRUCTURE_TYPE_VALIDATION_FLAGS_EXT = 1000061000,
  // Provided by VK_NN_vi_surface
    VK_STRUCTURE_TYPE_VI_SURFACE_CREATE_INFO_NN = 1000062000,
  // Provided by VK_EXT_astc_decode_mode
    VK_STRUCTURE_TYPE_IMAGE_VIEW_ASTC_DECODE_MODE_EXT = 1000067000,
  // Provided by VK_EXT_astc_decode_mode
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ASTC_DECODE_FEATURES_EXT = 1000067001,
  // Provided by VK_KHR_external_memory_win32
    VK_STRUCTURE_TYPE_IMPORT_MEMORY_WIN32_HANDLE_INFO_KHR = 1000073000,
  // Provided by VK_KHR_external_memory_win32
    VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_KHR = 1000073001,
  // Provided by VK_KHR_external_memory_win32
    VK_STRUCTURE_TYPE_MEMORY_WIN32_HANDLE_PROPERTIES_KHR = 1000073002,
  // Provided by VK_KHR_external_memory_win32
    VK_STRUCTURE_TYPE_MEMORY_GET_WIN32_HANDLE_INFO_KHR = 1000073003,
  // Provided by VK_KHR_external_memory_fd
    VK_STRUCTURE_TYPE_IMPORT_MEMORY_FD_INFO_KHR = 1000074000,
  // Provided by VK_KHR_external_memory_fd
    VK_STRUCTURE_TYPE_MEMORY_FD_PROPERTIES_KHR = 1000074001,
  // Provided by VK_KHR_external_memory_fd
    VK_STRUCTURE_TYPE_MEMORY_GET_FD_INFO_KHR = 1000074002,
  // Provided by VK_KHR_win32_keyed_mutex
    VK_STRUCTURE_TYPE_WIN32_KEYED_MUTEX_ACQUIRE_RELEASE_INFO_KHR = 1000075000,
  // Provided by VK_KHR_external_semaphore_win32
    VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_WIN32_HANDLE_INFO_KHR = 1000078000,
  // Provided by VK_KHR_external_semaphore_win32
    VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_WIN32_HANDLE_INFO_KHR = 1000078001,
  // Provided by VK_KHR_external_semaphore_win32
    VK_STRUCTURE_TYPE_D3D12_FENCE_SUBMIT_INFO_KHR = 1000078002,
  // Provided by VK_KHR_external_semaphore_win32
    VK_STRUCTURE_TYPE_SEMAPHORE_GET_WIN32_HANDLE_INFO_KHR = 1000078003,
  // Provided by VK_KHR_external_semaphore_fd
    VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_FD_INFO_KHR = 1000079000,
  // Provided by VK_KHR_external_semaphore_fd
    VK_STRUCTURE_TYPE_SEMAPHORE_GET_FD_INFO_KHR = 1000079001,
  // Provided by VK_EXT_conditional_rendering
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_CONDITIONAL_RENDERING_INFO_EXT = 1000081000,
  // Provided by VK_EXT_conditional_rendering
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CONDITIONAL_RENDERING_FEATURES_EXT = 1000081001,
  // Provided by VK_EXT_conditional_rendering
    VK_STRUCTURE_TYPE_CONDITIONAL_RENDERING_BEGIN_INFO_EXT = 1000081002,
  // Provided by VK_KHR_incremental_present
    VK_STRUCTURE_TYPE_PRESENT_REGIONS_KHR = 1000084000,
  // Provided by VK_NV_clip_space_w_scaling
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_W_SCALING_STATE_CREATE_INFO_NV = 1000087000,
  // Provided by VK_EXT_display_surface_counter
    VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_EXT = 1000090000,
  // Provided by VK_EXT_display_control
    VK_STRUCTURE_TYPE_DISPLAY_POWER_INFO_EXT = 1000091000,
  // Provided by VK_EXT_display_control
    VK_STRUCTURE_TYPE_DEVICE_EVENT_INFO_EXT = 1000091001,
  // Provided by VK_EXT_display_control
    VK_STRUCTURE_TYPE_DISPLAY_EVENT_INFO_EXT = 1000091002,
  // Provided by VK_EXT_display_control
    VK_STRUCTURE_TYPE_SWAPCHAIN_COUNTER_CREATE_INFO_EXT = 1000091003,
  // Provided by VK_GOOGLE_display_timing
    VK_STRUCTURE_TYPE_PRESENT_TIMES_INFO_GOOGLE = 1000092000,
  // Provided by VK_NVX_multiview_per_view_attributes
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_ATTRIBUTES_PROPERTIES_NVX = 1000097000,
  // Provided by VK_NVX_multiview_per_view_attributes with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_ATTRIBUTES_INFO_NVX = 1000044009,
  // Provided by VK_NV_viewport_swizzle
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_SWIZZLE_STATE_CREATE_INFO_NV = 1000098000,
  // Provided by VK_EXT_discard_rectangles
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISCARD_RECTANGLE_PROPERTIES_EXT = 1000099000,
  // Provided by VK_EXT_discard_rectangles
    VK_STRUCTURE_TYPE_PIPELINE_DISCARD_RECTANGLE_STATE_CREATE_INFO_EXT = 1000099001,
  // Provided by VK_EXT_conservative_rasterization
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CONSERVATIVE_RASTERIZATION_PROPERTIES_EXT = 1000101000,
  // Provided by VK_EXT_conservative_rasterization
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_CONSERVATIVE_STATE_CREATE_INFO_EXT = 1000101001,
  // Provided by VK_EXT_depth_clip_enable
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLIP_ENABLE_FEATURES_EXT = 1000102000,
  // Provided by VK_EXT_depth_clip_enable
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_DEPTH_CLIP_STATE_CREATE_INFO_EXT = 1000102001,
  // Provided by VK_EXT_hdr_metadata
    VK_STRUCTURE_TYPE_HDR_METADATA_EXT = 1000105000,
  // Provided by VK_IMG_relaxed_line_rasterization
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RELAXED_LINE_RASTERIZATION_FEATURES_IMG = 1000110000,
  // Provided by VK_KHR_shared_presentable_image
    VK_STRUCTURE_TYPE_SHARED_PRESENT_SURFACE_CAPABILITIES_KHR = 1000111000,
  // Provided by VK_KHR_external_fence_win32
    VK_STRUCTURE_TYPE_IMPORT_FENCE_WIN32_HANDLE_INFO_KHR = 1000114000,
  // Provided by VK_KHR_external_fence_win32
    VK_STRUCTURE_TYPE_EXPORT_FENCE_WIN32_HANDLE_INFO_KHR = 1000114001,
  // Provided by VK_KHR_external_fence_win32
    VK_STRUCTURE_TYPE_FENCE_GET_WIN32_HANDLE_INFO_KHR = 1000114002,
  // Provided by VK_KHR_external_fence_fd
    VK_STRUCTURE_TYPE_IMPORT_FENCE_FD_INFO_KHR = 1000115000,
  // Provided by VK_KHR_external_fence_fd
    VK_STRUCTURE_TYPE_FENCE_GET_FD_INFO_KHR = 1000115001,
  // Provided by VK_KHR_performance_query
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_QUERY_FEATURES_KHR = 1000116000,
  // Provided by VK_KHR_performance_query
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_QUERY_PROPERTIES_KHR = 1000116001,
  // Provided by VK_KHR_performance_query
    VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_CREATE_INFO_KHR = 1000116002,
  // Provided by VK_KHR_performance_query
    VK_STRUCTURE_TYPE_PERFORMANCE_QUERY_SUBMIT_INFO_KHR = 1000116003,
  // Provided by VK_KHR_performance_query
    VK_STRUCTURE_TYPE_ACQUIRE_PROFILING_LOCK_INFO_KHR = 1000116004,
  // Provided by VK_KHR_performance_query
    VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_KHR = 1000116005,
  // Provided by VK_KHR_performance_query
    VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_KHR = 1000116006,
  // Provided by VK_KHR_get_surface_capabilities2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SURFACE_INFO_2_KHR = 1000119000,
  // Provided by VK_KHR_get_surface_capabilities2
    VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_KHR = 1000119001,
  // Provided by VK_KHR_get_surface_capabilities2
    VK_STRUCTURE_TYPE_SURFACE_FORMAT_2_KHR = 1000119002,
  // Provided by VK_KHR_get_display_properties2
    VK_STRUCTURE_TYPE_DISPLAY_PROPERTIES_2_KHR = 1000121000,
  // Provided by VK_KHR_get_display_properties2
    VK_STRUCTURE_TYPE_DISPLAY_PLANE_PROPERTIES_2_KHR = 1000121001,
  // Provided by VK_KHR_get_display_properties2
    VK_STRUCTURE_TYPE_DISPLAY_MODE_PROPERTIES_2_KHR = 1000121002,
  // Provided by VK_KHR_get_display_properties2
    VK_STRUCTURE_TYPE_DISPLAY_PLANE_INFO_2_KHR = 1000121003,
  // Provided by VK_KHR_get_display_properties2
    VK_STRUCTURE_TYPE_DISPLAY_PLANE_CAPABILITIES_2_KHR = 1000121004,
  // Provided by VK_MVK_ios_surface
    VK_STRUCTURE_TYPE_IOS_SURFACE_CREATE_INFO_MVK = 1000122000,
  // Provided by VK_MVK_macos_surface
    VK_STRUCTURE_TYPE_MACOS_SURFACE_CREATE_INFO_MVK = 1000123000,
  // Provided by VK_EXT_debug_utils
    VK_STRUCTURE_TYPE_DEBUG_UTILS_OBJECT_NAME_INFO_EXT = 1000128000,
  // Provided by VK_EXT_debug_utils
    VK_STRUCTURE_TYPE_DEBUG_UTILS_OBJECT_TAG_INFO_EXT = 1000128001,
  // Provided by VK_EXT_debug_utils
    VK_STRUCTURE_TYPE_DEBUG_UTILS_LABEL_EXT = 1000128002,
  // Provided by VK_EXT_debug_utils
    VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CALLBACK_DATA_EXT = 1000128003,
  // Provided by VK_EXT_debug_utils
    VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CREATE_INFO_EXT = 1000128004,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_USAGE_ANDROID = 1000129000,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_PROPERTIES_ANDROID = 1000129001,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_ANDROID = 1000129002,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_STRUCTURE_TYPE_IMPORT_ANDROID_HARDWARE_BUFFER_INFO_ANDROID = 1000129003,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_STRUCTURE_TYPE_MEMORY_GET_ANDROID_HARDWARE_BUFFER_INFO_ANDROID = 1000129004,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer
    VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_ANDROID = 1000129005,
  // Provided by VK_ANDROID_external_memory_android_hardware_buffer with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
    VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_2_ANDROID = 1000129006,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ENQUEUE_FEATURES_AMDX = 1000134000,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ENQUEUE_PROPERTIES_AMDX = 1000134001,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_SCRATCH_SIZE_AMDX = 1000134002,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_CREATE_INFO_AMDX = 1000134003,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_shader_enqueue
    VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_NODE_CREATE_INFO_AMDX = 1000134004,
#endif
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_TEXEL_BUFFER_DESCRIPTOR_INFO_EXT = 1000135000,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_IMAGE_DESCRIPTOR_INFO_EXT = 1000135001,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_RESOURCE_DESCRIPTOR_INFO_EXT = 1000135002,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_BIND_HEAP_INFO_EXT = 1000135003,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_PUSH_DATA_INFO_EXT = 1000135004,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_AND_BINDING_MAPPING_EXT = 1000135005,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_SHADER_DESCRIPTOR_SET_AND_BINDING_MAPPING_INFO_EXT = 1000135006,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DATA_CREATE_INFO_EXT = 1000135007,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_PROPERTIES_EXT = 1000135008,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_FEATURES_EXT = 1000135009,
  // Provided by VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_DESCRIPTOR_HEAP_INFO_EXT = 1000135010,
  // Provided by VK_EXT_custom_border_color with VK_EXT_descriptor_heap
    VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_INDEX_CREATE_INFO_EXT = 1000135011,
  // Provided by VK_EXT_descriptor_heap with VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_PUSH_DATA_TOKEN_NV = 1000135012,
  // Provided by VK_EXT_descriptor_heap with VK_EXT_fragment_density_map
    VK_STRUCTURE_TYPE_SUBSAMPLED_IMAGE_FORMAT_PROPERTIES_EXT = 1000135013,
  // Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_HEAP_TENSOR_PROPERTIES_ARM = 1000135014,
  // Provided by VK_AMD_mixed_attachment_samples with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_ATTACHMENT_SAMPLE_COUNT_INFO_AMD = 1000044008,
  // Provided by VK_KHR_shader_bfloat16
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_BFLOAT16_FEATURES_KHR = 1000141000,
  // Provided by VK_EXT_sample_locations
    VK_STRUCTURE_TYPE_SAMPLE_LOCATIONS_INFO_EXT = 1000143000,
  // Provided by VK_EXT_sample_locations
    VK_STRUCTURE_TYPE_RENDER_PASS_SAMPLE_LOCATIONS_BEGIN_INFO_EXT = 1000143001,
  // Provided by VK_EXT_sample_locations
    VK_STRUCTURE_TYPE_PIPELINE_SAMPLE_LOCATIONS_STATE_CREATE_INFO_EXT = 1000143002,
  // Provided by VK_EXT_sample_locations
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLE_LOCATIONS_PROPERTIES_EXT = 1000143003,
  // Provided by VK_EXT_sample_locations
    VK_STRUCTURE_TYPE_MULTISAMPLE_PROPERTIES_EXT = 1000143004,
  // Provided by VK_EXT_blend_operation_advanced
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_FEATURES_EXT = 1000148000,
  // Provided by VK_EXT_blend_operation_advanced
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BLEND_OPERATION_ADVANCED_PROPERTIES_EXT = 1000148001,
  // Provided by VK_EXT_blend_operation_advanced
    VK_STRUCTURE_TYPE_PIPELINE_COLOR_BLEND_ADVANCED_STATE_CREATE_INFO_EXT = 1000148002,
  // Provided by VK_NV_fragment_coverage_to_color
    VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_TO_COLOR_STATE_CREATE_INFO_NV = 1000149000,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_KHR = 1000150007,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_GEOMETRY_INFO_KHR = 1000150000,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DEVICE_ADDRESS_INFO_KHR = 1000150002,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_AABBS_DATA_KHR = 1000150003,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_INSTANCES_DATA_KHR = 1000150004,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_TRIANGLES_DATA_KHR = 1000150005,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_KHR = 1000150006,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_VERSION_INFO_KHR = 1000150009,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_INFO_KHR = 1000150010,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_COPY_ACCELERATION_STRUCTURE_TO_MEMORY_INFO_KHR = 1000150011,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_COPY_MEMORY_TO_ACCELERATION_STRUCTURE_INFO_KHR = 1000150012,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ACCELERATION_STRUCTURE_FEATURES_KHR = 1000150013,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ACCELERATION_STRUCTURE_PROPERTIES_KHR = 1000150014,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_KHR = 1000150017,
  // Provided by VK_KHR_acceleration_structure
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_BUILD_SIZES_INFO_KHR = 1000150020,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_FEATURES_KHR = 1000347000,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PIPELINE_PROPERTIES_KHR = 1000347001,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_KHR = 1000150015,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_STRUCTURE_TYPE_RAY_TRACING_SHADER_GROUP_CREATE_INFO_KHR = 1000150016,
  // Provided by VK_KHR_ray_tracing_pipeline
    VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_INTERFACE_CREATE_INFO_KHR = 1000150018,
  // Provided by VK_KHR_ray_query
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_QUERY_FEATURES_KHR = 1000348013,
  // Provided by VK_NV_framebuffer_mixed_samples
    VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_MODULATION_STATE_CREATE_INFO_NV = 1000152000,
  // Provided by VK_NV_shader_sm_builtins
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SM_BUILTINS_FEATURES_NV = 1000154000,
  // Provided by VK_NV_shader_sm_builtins
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SM_BUILTINS_PROPERTIES_NV = 1000154001,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_STRUCTURE_TYPE_DRM_FORMAT_MODIFIER_PROPERTIES_LIST_EXT = 1000158000,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_DRM_FORMAT_MODIFIER_INFO_EXT = 1000158002,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_LIST_CREATE_INFO_EXT = 1000158003,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_EXPLICIT_CREATE_INFO_EXT = 1000158004,
  // Provided by VK_EXT_image_drm_format_modifier
    VK_STRUCTURE_TYPE_IMAGE_DRM_FORMAT_MODIFIER_PROPERTIES_EXT = 1000158005,
  // Provided by VK_EXT_image_drm_format_modifier with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
    VK_STRUCTURE_TYPE_DRM_FORMAT_MODIFIER_PROPERTIES_LIST_2_EXT = 1000158006,
  // Provided by VK_EXT_validation_cache
    VK_STRUCTURE_TYPE_VALIDATION_CACHE_CREATE_INFO_EXT = 1000160000,
  // Provided by VK_EXT_validation_cache
    VK_STRUCTURE_TYPE_SHADER_MODULE_VALIDATION_CACHE_CREATE_INFO_EXT = 1000160001,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_KHR_portability_subset
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_FEATURES_KHR = 1000163000,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_KHR_portability_subset
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PORTABILITY_SUBSET_PROPERTIES_KHR = 1000163001,
#endif
  // Provided by VK_NV_shading_rate_image
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_SHADING_RATE_IMAGE_STATE_CREATE_INFO_NV = 1000164000,
  // Provided by VK_NV_shading_rate_image
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADING_RATE_IMAGE_FEATURES_NV = 1000164001,
  // Provided by VK_NV_shading_rate_image
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADING_RATE_IMAGE_PROPERTIES_NV = 1000164002,
  // Provided by VK_NV_shading_rate_image
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_COARSE_SAMPLE_ORDER_STATE_CREATE_INFO_NV = 1000164005,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CREATE_INFO_NV = 1000165000,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_NV = 1000165001,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_GEOMETRY_NV = 1000165003,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_GEOMETRY_TRIANGLES_NV = 1000165004,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_GEOMETRY_AABB_NV = 1000165005,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_BIND_ACCELERATION_STRUCTURE_MEMORY_INFO_NV = 1000165006,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_ACCELERATION_STRUCTURE_NV = 1000165007,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MEMORY_REQUIREMENTS_INFO_NV = 1000165008,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_PROPERTIES_NV = 1000165009,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_RAY_TRACING_SHADER_GROUP_CREATE_INFO_NV = 1000165011,
  // Provided by VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_INFO_NV = 1000165012,
  // Provided by VK_NV_representative_fragment_test
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_REPRESENTATIVE_FRAGMENT_TEST_FEATURES_NV = 1000166000,
  // Provided by VK_NV_representative_fragment_test
    VK_STRUCTURE_TYPE_PIPELINE_REPRESENTATIVE_FRAGMENT_TEST_STATE_CREATE_INFO_NV = 1000166001,
  // Provided by VK_EXT_filter_cubic
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_VIEW_IMAGE_FORMAT_INFO_EXT = 1000170000,
  // Provided by VK_EXT_filter_cubic
    VK_STRUCTURE_TYPE_FILTER_CUBIC_IMAGE_VIEW_IMAGE_FORMAT_PROPERTIES_EXT = 1000170001,
  // Provided by VK_QCOM_cooperative_matrix_conversion
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_CONVERSION_FEATURES_QCOM = 1000172000,
  // Provided by VK_EXT_external_memory_host
    VK_STRUCTURE_TYPE_IMPORT_MEMORY_HOST_POINTER_INFO_EXT = 1000178000,
  // Provided by VK_EXT_external_memory_host
    VK_STRUCTURE_TYPE_MEMORY_HOST_POINTER_PROPERTIES_EXT = 1000178001,
  // Provided by VK_EXT_external_memory_host
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_HOST_PROPERTIES_EXT = 1000178002,
  // Provided by VK_KHR_shader_clock
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CLOCK_FEATURES_KHR = 1000181000,
  // Provided by VK_AMD_pipeline_compiler_control
    VK_STRUCTURE_TYPE_PIPELINE_COMPILER_CONTROL_CREATE_INFO_AMD = 1000183000,
  // Provided by VK_AMD_shader_core_properties
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_AMD = 1000185000,
  // Provided by VK_KHR_video_decode_h265
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_CAPABILITIES_KHR = 1000187000,
  // Provided by VK_KHR_video_decode_h265
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000187001,
  // Provided by VK_KHR_video_decode_h265
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_SESSION_PARAMETERS_ADD_INFO_KHR = 1000187002,
  // Provided by VK_KHR_video_decode_h265
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PROFILE_INFO_KHR = 1000187003,
  // Provided by VK_KHR_video_decode_h265
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_PICTURE_INFO_KHR = 1000187004,
  // Provided by VK_KHR_video_decode_h265
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_DPB_SLOT_INFO_KHR = 1000187005,
  // Provided by VK_AMD_memory_overallocation_behavior
    VK_STRUCTURE_TYPE_DEVICE_MEMORY_OVERALLOCATION_CREATE_INFO_AMD = 1000189000,
  // Provided by VK_EXT_vertex_attribute_divisor
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES_EXT = 1000190000,
  // Provided by VK_GGP_frame_token
    VK_STRUCTURE_TYPE_PRESENT_FRAME_TOKEN_GGP = 1000191000,
  // Provided by VK_NV_mesh_shader
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_NV = 1000202000,
  // Provided by VK_NV_mesh_shader
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_PROPERTIES_NV = 1000202001,
  // Provided by VK_NV_shader_image_footprint
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_IMAGE_FOOTPRINT_FEATURES_NV = 1000204000,
  // Provided by VK_NV_scissor_exclusive
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_EXCLUSIVE_SCISSOR_STATE_CREATE_INFO_NV = 1000205000,
  // Provided by VK_NV_scissor_exclusive
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXCLUSIVE_SCISSOR_FEATURES_NV = 1000205002,
  // Provided by VK_NV_device_diagnostic_checkpoints
    VK_STRUCTURE_TYPE_CHECKPOINT_DATA_NV = 1000206000,
  // Provided by VK_NV_device_diagnostic_checkpoints
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_NV = 1000206001,
  // Provided by VK_NV_device_diagnostic_checkpoints with VK_VERSION_1_3 or VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_CHECKPOINT_PROPERTIES_2_NV = 1000314008,
  // Provided by VK_NV_device_diagnostic_checkpoints with VK_VERSION_1_3 or VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_CHECKPOINT_DATA_2_NV = 1000314009,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_TIMING_FEATURES_EXT = 1000208000,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_SWAPCHAIN_TIMING_PROPERTIES_EXT = 1000208001,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_SWAPCHAIN_TIME_DOMAIN_PROPERTIES_EXT = 1000208002,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_PRESENT_TIMINGS_INFO_EXT = 1000208003,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_PRESENT_TIMING_INFO_EXT = 1000208004,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_INFO_EXT = 1000208005,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_PROPERTIES_EXT = 1000208006,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_PAST_PRESENTATION_TIMING_EXT = 1000208007,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_PRESENT_TIMING_SURFACE_CAPABILITIES_EXT = 1000208008,
  // Provided by VK_EXT_present_timing
    VK_STRUCTURE_TYPE_SWAPCHAIN_CALIBRATED_TIMESTAMP_INFO_EXT = 1000208009,
  // Provided by VK_INTEL_shader_integer_functions2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_FUNCTIONS_2_FEATURES_INTEL = 1000209000,
  // Provided by VK_INTEL_performance_query
    VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_QUERY_CREATE_INFO_INTEL = 1000210000,
  // Provided by VK_INTEL_performance_query
    VK_STRUCTURE_TYPE_INITIALIZE_PERFORMANCE_API_INFO_INTEL = 1000210001,
  // Provided by VK_INTEL_performance_query
    VK_STRUCTURE_TYPE_PERFORMANCE_MARKER_INFO_INTEL = 1000210002,
  // Provided by VK_INTEL_performance_query
    VK_STRUCTURE_TYPE_PERFORMANCE_STREAM_MARKER_INFO_INTEL = 1000210003,
  // Provided by VK_INTEL_performance_query
    VK_STRUCTURE_TYPE_PERFORMANCE_OVERRIDE_INFO_INTEL = 1000210004,
  // Provided by VK_INTEL_performance_query
    VK_STRUCTURE_TYPE_PERFORMANCE_CONFIGURATION_ACQUIRE_INFO_INTEL = 1000210005,
  // Provided by VK_EXT_pci_bus_info
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PCI_BUS_INFO_PROPERTIES_EXT = 1000212000,
  // Provided by VK_AMD_display_native_hdr
    VK_STRUCTURE_TYPE_DISPLAY_NATIVE_HDR_SURFACE_CAPABILITIES_AMD = 1000213000,
  // Provided by VK_AMD_display_native_hdr
    VK_STRUCTURE_TYPE_SWAPCHAIN_DISPLAY_NATIVE_HDR_CREATE_INFO_AMD = 1000213001,
  // Provided by VK_FUCHSIA_imagepipe_surface
    VK_STRUCTURE_TYPE_IMAGEPIPE_SURFACE_CREATE_INFO_FUCHSIA = 1000214000,
  // Provided by VK_EXT_metal_surface
    VK_STRUCTURE_TYPE_METAL_SURFACE_CREATE_INFO_EXT = 1000217000,
  // Provided by VK_EXT_fragment_density_map
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_FEATURES_EXT = 1000218000,
  // Provided by VK_EXT_fragment_density_map
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_PROPERTIES_EXT = 1000218001,
  // Provided by VK_EXT_fragment_density_map
    VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_CREATE_INFO_EXT = 1000218002,
  // Provided by VK_EXT_fragment_density_map with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_DENSITY_MAP_ATTACHMENT_INFO_EXT = 1000044007,
  // Provided by VK_KHR_fragment_shading_rate
    VK_STRUCTURE_TYPE_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR = 1000226000,
  // Provided by VK_KHR_fragment_shading_rate
    VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_SHADING_RATE_STATE_CREATE_INFO_KHR = 1000226001,
  // Provided by VK_KHR_fragment_shading_rate
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_PROPERTIES_KHR = 1000226002,
  // Provided by VK_KHR_fragment_shading_rate
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_FEATURES_KHR = 1000226003,
  // Provided by VK_KHR_fragment_shading_rate
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_KHR = 1000226004,
  // Provided by VK_KHR_fragment_shading_rate with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR = 1000044006,
  // Provided by VK_AMD_shader_core_properties2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_2_AMD = 1000227000,
  // Provided by VK_AMD_device_coherent_memory
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COHERENT_MEMORY_FEATURES_AMD = 1000229000,
  // Provided by VK_EXT_shader_image_atomic_int64
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_IMAGE_ATOMIC_INT64_FEATURES_EXT = 1000234000,
  // Provided by VK_KHR_shader_quad_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_QUAD_CONTROL_FEATURES_KHR = 1000235000,
  // Provided by VK_EXT_memory_budget
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_BUDGET_PROPERTIES_EXT = 1000237000,
  // Provided by VK_EXT_memory_priority
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PRIORITY_FEATURES_EXT = 1000238000,
  // Provided by VK_EXT_memory_priority
    VK_STRUCTURE_TYPE_MEMORY_PRIORITY_ALLOCATE_INFO_EXT = 1000238001,
  // Provided by VK_KHR_surface_protected_capabilities
    VK_STRUCTURE_TYPE_SURFACE_PROTECTED_CAPABILITIES_KHR = 1000239000,
  // Provided by VK_NV_dedicated_allocation_image_aliasing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEDICATED_ALLOCATION_IMAGE_ALIASING_FEATURES_NV = 1000240000,
  // Provided by VK_EXT_buffer_device_address
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_EXT = 1000244000,
  // Provided by VK_EXT_buffer_device_address
    VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_CREATE_INFO_EXT = 1000244002,
  // Provided by VK_EXT_validation_features
    VK_STRUCTURE_TYPE_VALIDATION_FEATURES_EXT = 1000247000,
  // Provided by VK_KHR_present_wait
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_WAIT_FEATURES_KHR = 1000248000,
  // Provided by VK_NV_cooperative_matrix
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_FEATURES_NV = 1000249000,
  // Provided by VK_NV_cooperative_matrix
    VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_NV = 1000249001,
  // Provided by VK_NV_cooperative_matrix
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_PROPERTIES_NV = 1000249002,
  // Provided by VK_NV_coverage_reduction_mode
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COVERAGE_REDUCTION_MODE_FEATURES_NV = 1000250000,
  // Provided by VK_NV_coverage_reduction_mode
    VK_STRUCTURE_TYPE_PIPELINE_COVERAGE_REDUCTION_STATE_CREATE_INFO_NV = 1000250001,
  // Provided by VK_NV_coverage_reduction_mode
    VK_STRUCTURE_TYPE_FRAMEBUFFER_MIXED_SAMPLES_COMBINATION_NV = 1000250002,
  // Provided by VK_EXT_fragment_shader_interlock
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_INTERLOCK_FEATURES_EXT = 1000251000,
  // Provided by VK_EXT_ycbcr_image_arrays
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_IMAGE_ARRAYS_FEATURES_EXT = 1000252000,
  // Provided by VK_EXT_provoking_vertex
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROVOKING_VERTEX_FEATURES_EXT = 1000254000,
  // Provided by VK_EXT_provoking_vertex
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_PROVOKING_VERTEX_STATE_CREATE_INFO_EXT = 1000254001,
  // Provided by VK_EXT_provoking_vertex
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROVOKING_VERTEX_PROPERTIES_EXT = 1000254002,
  // Provided by VK_EXT_full_screen_exclusive
    VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_INFO_EXT = 1000255000,
  // Provided by VK_EXT_full_screen_exclusive
    VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_FULL_SCREEN_EXCLUSIVE_EXT = 1000255002,
  // Provided by VK_KHR_win32_surface with VK_EXT_full_screen_exclusive
    VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_WIN32_INFO_EXT = 1000255001,
  // Provided by VK_EXT_headless_surface
    VK_STRUCTURE_TYPE_HEADLESS_SURFACE_CREATE_INFO_EXT = 1000256000,
  // Provided by VK_EXT_shader_atomic_float
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_FEATURES_EXT = 1000260000,
  // Provided by VK_EXT_extended_dynamic_state
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_FEATURES_EXT = 1000267000,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_EXECUTABLE_PROPERTIES_FEATURES_KHR = 1000269000,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_STRUCTURE_TYPE_PIPELINE_INFO_KHR = 1000269001,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_PROPERTIES_KHR = 1000269002,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_INFO_KHR = 1000269003,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_STATISTIC_KHR = 1000269004,
  // Provided by VK_KHR_pipeline_executable_properties
    VK_STRUCTURE_TYPE_PIPELINE_EXECUTABLE_INTERNAL_REPRESENTATION_KHR = 1000269005,
  // Provided by VK_EXT_map_memory_placed
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAP_MEMORY_PLACED_FEATURES_EXT = 1000272000,
  // Provided by VK_EXT_map_memory_placed
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAP_MEMORY_PLACED_PROPERTIES_EXT = 1000272001,
  // Provided by VK_EXT_map_memory_placed
    VK_STRUCTURE_TYPE_MEMORY_MAP_PLACED_INFO_EXT = 1000272002,
  // Provided by VK_EXT_shader_atomic_float2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT_2_FEATURES_EXT = 1000273000,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_NV = 1000277000,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_GRAPHICS_SHADER_GROUP_CREATE_INFO_NV = 1000277001,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_SHADER_GROUPS_CREATE_INFO_NV = 1000277002,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_TOKEN_NV = 1000277003,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_NV = 1000277004,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_NV = 1000277005,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_NV = 1000277006,
  // Provided by VK_NV_device_generated_commands
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_FEATURES_NV = 1000277007,
  // Provided by VK_NV_inherited_viewport_scissor
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INHERITED_VIEWPORT_SCISSOR_FEATURES_NV = 1000278000,
  // Provided by VK_NV_inherited_viewport_scissor
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_VIEWPORT_SCISSOR_INFO_NV = 1000278001,
  // Provided by VK_EXT_texel_buffer_alignment
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_FEATURES_EXT = 1000281000,
  // Provided by VK_QCOM_render_pass_transform
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDER_PASS_TRANSFORM_INFO_QCOM = 1000282000,
  // Provided by VK_QCOM_render_pass_transform
    VK_STRUCTURE_TYPE_RENDER_PASS_TRANSFORM_BEGIN_INFO_QCOM = 1000282001,
  // Provided by VK_EXT_depth_bias_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_BIAS_CONTROL_FEATURES_EXT = 1000283000,
  // Provided by VK_EXT_depth_bias_control
    VK_STRUCTURE_TYPE_DEPTH_BIAS_INFO_EXT = 1000283001,
  // Provided by VK_EXT_depth_bias_control
    VK_STRUCTURE_TYPE_DEPTH_BIAS_REPRESENTATION_INFO_EXT = 1000283002,
  // Provided by VK_EXT_device_memory_report
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_MEMORY_REPORT_FEATURES_EXT = 1000284000,
  // Provided by VK_EXT_device_memory_report
    VK_STRUCTURE_TYPE_DEVICE_DEVICE_MEMORY_REPORT_CREATE_INFO_EXT = 1000284001,
  // Provided by VK_EXT_device_memory_report
    VK_STRUCTURE_TYPE_DEVICE_MEMORY_REPORT_CALLBACK_DATA_EXT = 1000284002,
  // Provided by VK_EXT_custom_border_color
    VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_CREATE_INFO_EXT = 1000287000,
  // Provided by VK_EXT_custom_border_color
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_PROPERTIES_EXT = 1000287001,
  // Provided by VK_EXT_custom_border_color
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_BORDER_COLOR_FEATURES_EXT = 1000287002,
  // Provided by VK_EXT_texture_compression_astc_3d
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_3D_FEATURES_EXT = 1000288000,
  // Provided by VK_KHR_pipeline_library
    VK_STRUCTURE_TYPE_PIPELINE_LIBRARY_CREATE_INFO_KHR = 1000290000,
  // Provided by VK_NV_present_barrier
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_BARRIER_FEATURES_NV = 1000292000,
  // Provided by VK_NV_present_barrier
    VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_BARRIER_NV = 1000292001,
  // Provided by VK_NV_present_barrier
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_BARRIER_CREATE_INFO_NV = 1000292002,
  // Provided by VK_KHR_present_id
    VK_STRUCTURE_TYPE_PRESENT_ID_KHR = 1000294000,
  // Provided by VK_KHR_present_id
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_ID_FEATURES_KHR = 1000294001,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_INFO_KHR = 1000299000,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_INFO_KHR = 1000299001,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_RATE_CONTROL_LAYER_INFO_KHR = 1000299002,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_CAPABILITIES_KHR = 1000299003,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_USAGE_INFO_KHR = 1000299004,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_FEEDBACK_CREATE_INFO_KHR = 1000299005,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR = 1000299006,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_PROPERTIES_KHR = 1000299007,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUALITY_LEVEL_INFO_KHR = 1000299008,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_GET_INFO_KHR = 1000299009,
  // Provided by VK_KHR_video_encode_queue
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_PARAMETERS_FEEDBACK_INFO_KHR = 1000299010,
  // Provided by VK_NV_device_diagnostics_config
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DIAGNOSTICS_CONFIG_FEATURES_NV = 1000300000,
  // Provided by VK_NV_device_diagnostics_config
    VK_STRUCTURE_TYPE_DEVICE_DIAGNOSTICS_CONFIG_CREATE_INFO_NV = 1000300001,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_cuda_kernel_launch
    VK_STRUCTURE_TYPE_CUDA_MODULE_CREATE_INFO_NV = 1000307000,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_cuda_kernel_launch
    VK_STRUCTURE_TYPE_CUDA_FUNCTION_CREATE_INFO_NV = 1000307001,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_cuda_kernel_launch
    VK_STRUCTURE_TYPE_CUDA_LAUNCH_INFO_NV = 1000307002,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_cuda_kernel_launch
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUDA_KERNEL_LAUNCH_FEATURES_NV = 1000307003,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_cuda_kernel_launch
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUDA_KERNEL_LAUNCH_PROPERTIES_NV = 1000307004,
#endif
  // Provided by VK_QCOM_tile_shading
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_FEATURES_QCOM = 1000309000,
  // Provided by VK_QCOM_tile_shading
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_SHADING_PROPERTIES_QCOM = 1000309001,
  // Provided by VK_QCOM_tile_shading
    VK_STRUCTURE_TYPE_RENDER_PASS_TILE_SHADING_CREATE_INFO_QCOM = 1000309002,
  // Provided by VK_QCOM_tile_shading
    VK_STRUCTURE_TYPE_PER_TILE_BEGIN_INFO_QCOM = 1000309003,
  // Provided by VK_QCOM_tile_shading
    VK_STRUCTURE_TYPE_PER_TILE_END_INFO_QCOM = 1000309004,
  // Provided by VK_QCOM_tile_shading
    VK_STRUCTURE_TYPE_DISPATCH_TILE_INFO_QCOM = 1000309005,
  // Provided by VK_NV_low_latency
    VK_STRUCTURE_TYPE_QUERY_LOW_LATENCY_SUPPORT_NV = 1000310000,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECT_CREATE_INFO_EXT = 1000311000,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECTS_INFO_EXT = 1000311001,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_DEVICE_INFO_EXT = 1000311002,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_COMMAND_QUEUE_INFO_EXT = 1000311003,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_BUFFER_INFO_EXT = 1000311004,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_IMPORT_METAL_BUFFER_INFO_EXT = 1000311005,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_TEXTURE_INFO_EXT = 1000311006,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_IMPORT_METAL_TEXTURE_INFO_EXT = 1000311007,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_IO_SURFACE_INFO_EXT = 1000311008,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_IMPORT_METAL_IO_SURFACE_INFO_EXT = 1000311009,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_EXPORT_METAL_SHARED_EVENT_INFO_EXT = 1000311010,
  // Provided by VK_EXT_metal_objects
    VK_STRUCTURE_TYPE_IMPORT_METAL_SHARED_EVENT_INFO_EXT = 1000311011,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_PROPERTIES_EXT = 1000316000,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_DENSITY_MAP_PROPERTIES_EXT = 1000316001,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_FEATURES_EXT = 1000316002,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_DESCRIPTOR_ADDRESS_INFO_EXT = 1000316003,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_DESCRIPTOR_GET_INFO_EXT = 1000316004,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_BUFFER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT = 1000316005,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_IMAGE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT = 1000316006,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_IMAGE_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_EXT = 1000316007,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_SAMPLER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT = 1000316008,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DESCRIPTOR_DATA_CREATE_INFO_EXT = 1000316010,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_INFO_EXT = 1000316011,
  // Provided by VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_PUSH_DESCRIPTOR_BUFFER_HANDLE_EXT = 1000316012,
  // Provided by VK_EXT_descriptor_buffer with VK_KHR_acceleration_structure or VK_NV_ray_tracing
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT = 1000316009,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_DEVICE_MEMORY_COPY_KHR = 1000318000,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_COPY_DEVICE_MEMORY_INFO_KHR = 1000318001,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_DEVICE_MEMORY_IMAGE_COPY_KHR = 1000318002,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_COPY_DEVICE_MEMORY_IMAGE_INFO_KHR = 1000318003,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIERS_INFO_KHR = 1000318004,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_MEMORY_RANGE_BARRIER_KHR = 1000318005,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_ADDRESS_COMMANDS_FEATURES_KHR = 1000318006,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_BIND_INDEX_BUFFER_3_INFO_KHR = 1000318007,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_BIND_VERTEX_BUFFER_3_INFO_KHR = 1000318008,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_DRAW_INDIRECT_2_INFO_KHR = 1000318009,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_DRAW_INDIRECT_COUNT_2_INFO_KHR = 1000318010,
  // Provided by VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_DISPATCH_INDIRECT_2_INFO_KHR = 1000318011,
  // Provided by VK_KHR_device_address_commands with VK_EXT_conditional_rendering
    VK_STRUCTURE_TYPE_CONDITIONAL_RENDERING_BEGIN_INFO_2_EXT = 1000318012,
  // Provided by VK_KHR_device_address_commands with VK_EXT_transform_feedback
    VK_STRUCTURE_TYPE_BIND_TRANSFORM_FEEDBACK_BUFFER_2_INFO_EXT = 1000318013,
  // Provided by VK_KHR_device_address_commands with VK_AMD_buffer_marker
    VK_STRUCTURE_TYPE_MEMORY_MARKER_INFO_AMD = 1000318014,
  // Provided by VK_KHR_acceleration_structure with VK_KHR_device_address_commands
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CREATE_INFO_2_KHR = 1000318015,
  // Provided by VK_EXT_graphics_pipeline_library
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GRAPHICS_PIPELINE_LIBRARY_FEATURES_EXT = 1000320000,
  // Provided by VK_EXT_graphics_pipeline_library
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GRAPHICS_PIPELINE_LIBRARY_PROPERTIES_EXT = 1000320001,
  // Provided by VK_EXT_graphics_pipeline_library
    VK_STRUCTURE_TYPE_GRAPHICS_PIPELINE_LIBRARY_CREATE_INFO_EXT = 1000320002,
  // Provided by VK_AMD_shader_early_and_late_fragment_tests
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EARLY_AND_LATE_FRAGMENT_TESTS_FEATURES_AMD = 1000321000,
  // Provided by VK_KHR_fragment_shader_barycentric
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_FEATURES_KHR = 1000203000,
  // Provided by VK_KHR_fragment_shader_barycentric
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_PROPERTIES_KHR = 1000322000,
  // Provided by VK_KHR_shader_subgroup_uniform_control_flow
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_UNIFORM_CONTROL_FLOW_FEATURES_KHR = 1000323000,
  // Provided by VK_NV_fragment_shading_rate_enums
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_ENUMS_PROPERTIES_NV = 1000326000,
  // Provided by VK_NV_fragment_shading_rate_enums
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADING_RATE_ENUMS_FEATURES_NV = 1000326001,
  // Provided by VK_NV_fragment_shading_rate_enums
    VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_SHADING_RATE_ENUM_STATE_CREATE_INFO_NV = 1000326002,
  // Provided by VK_NV_ray_tracing_motion_blur
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_MOTION_TRIANGLES_DATA_NV = 1000327000,
  // Provided by VK_NV_ray_tracing_motion_blur
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_MOTION_BLUR_FEATURES_NV = 1000327001,
  // Provided by VK_NV_ray_tracing_motion_blur
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_MOTION_INFO_NV = 1000327002,
  // Provided by VK_EXT_mesh_shader
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_FEATURES_EXT = 1000328000,
  // Provided by VK_EXT_mesh_shader
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MESH_SHADER_PROPERTIES_EXT = 1000328001,
  // Provided by VK_EXT_ycbcr_2plane_444_formats
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_2_PLANE_444_FORMATS_FEATURES_EXT = 1000330000,
  // Provided by VK_EXT_fragment_density_map2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_2_FEATURES_EXT = 1000332000,
  // Provided by VK_EXT_fragment_density_map2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_2_PROPERTIES_EXT = 1000332001,
  // Provided by VK_QCOM_rotated_copy_commands
    VK_STRUCTURE_TYPE_COPY_COMMAND_TRANSFORM_INFO_QCOM = 1000333000,
  // Provided by VK_KHR_workgroup_memory_explicit_layout
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_WORKGROUP_MEMORY_EXPLICIT_LAYOUT_FEATURES_KHR = 1000336000,
  // Provided by VK_EXT_image_compression_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_COMPRESSION_CONTROL_FEATURES_EXT = 1000338000,
  // Provided by VK_EXT_image_compression_control
    VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_CONTROL_EXT = 1000338001,
  // Provided by VK_EXT_image_compression_control
    VK_STRUCTURE_TYPE_IMAGE_COMPRESSION_PROPERTIES_EXT = 1000338004,
  // Provided by VK_EXT_attachment_feedback_loop_layout
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ATTACHMENT_FEEDBACK_LOOP_LAYOUT_FEATURES_EXT = 1000339000,
  // Provided by VK_EXT_4444_formats
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_4444_FORMATS_FEATURES_EXT = 1000340000,
  // Provided by VK_EXT_device_fault
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FAULT_FEATURES_EXT = 1000341000,
  // Provided by VK_EXT_device_fault
    VK_STRUCTURE_TYPE_DEVICE_FAULT_COUNTS_EXT = 1000341001,
  // Provided by VK_EXT_device_fault
    VK_STRUCTURE_TYPE_DEVICE_FAULT_INFO_EXT = 1000341002,
  // Provided by VK_EXT_rgba10x6_formats
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RGBA10X6_FORMATS_FEATURES_EXT = 1000344000,
  // Provided by VK_EXT_directfb_surface
    VK_STRUCTURE_TYPE_DIRECTFB_SURFACE_CREATE_INFO_EXT = 1000346000,
  // Provided by VK_EXT_vertex_input_dynamic_state
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_INPUT_DYNAMIC_STATE_FEATURES_EXT = 1000352000,
  // Provided by VK_EXT_shader_object, VK_EXT_vertex_input_dynamic_state
    VK_STRUCTURE_TYPE_VERTEX_INPUT_BINDING_DESCRIPTION_2_EXT = 1000352001,
  // Provided by VK_EXT_shader_object, VK_EXT_vertex_input_dynamic_state
    VK_STRUCTURE_TYPE_VERTEX_INPUT_ATTRIBUTE_DESCRIPTION_2_EXT = 1000352002,
  // Provided by VK_EXT_physical_device_drm
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRM_PROPERTIES_EXT = 1000353000,
  // Provided by VK_EXT_device_address_binding_report
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ADDRESS_BINDING_REPORT_FEATURES_EXT = 1000354000,
  // Provided by VK_EXT_device_address_binding_report
    VK_STRUCTURE_TYPE_DEVICE_ADDRESS_BINDING_CALLBACK_DATA_EXT = 1000354001,
  // Provided by VK_EXT_depth_clip_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLIP_CONTROL_FEATURES_EXT = 1000355000,
  // Provided by VK_EXT_depth_clip_control
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_DEPTH_CLIP_CONTROL_CREATE_INFO_EXT = 1000355001,
  // Provided by VK_EXT_primitive_topology_list_restart
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVE_TOPOLOGY_LIST_RESTART_FEATURES_EXT = 1000356000,
  // Provided by VK_FUCHSIA_external_memory
    VK_STRUCTURE_TYPE_IMPORT_MEMORY_ZIRCON_HANDLE_INFO_FUCHSIA = 1000364000,
  // Provided by VK_FUCHSIA_external_memory
    VK_STRUCTURE_TYPE_MEMORY_ZIRCON_HANDLE_PROPERTIES_FUCHSIA = 1000364001,
  // Provided by VK_FUCHSIA_external_memory
    VK_STRUCTURE_TYPE_MEMORY_GET_ZIRCON_HANDLE_INFO_FUCHSIA = 1000364002,
  // Provided by VK_FUCHSIA_external_semaphore
    VK_STRUCTURE_TYPE_IMPORT_SEMAPHORE_ZIRCON_HANDLE_INFO_FUCHSIA = 1000365000,
  // Provided by VK_FUCHSIA_external_semaphore
    VK_STRUCTURE_TYPE_SEMAPHORE_GET_ZIRCON_HANDLE_INFO_FUCHSIA = 1000365001,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CREATE_INFO_FUCHSIA = 1000366000,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_IMPORT_MEMORY_BUFFER_COLLECTION_FUCHSIA = 1000366001,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_BUFFER_COLLECTION_IMAGE_CREATE_INFO_FUCHSIA = 1000366002,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_BUFFER_COLLECTION_PROPERTIES_FUCHSIA = 1000366003,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_BUFFER_CONSTRAINTS_INFO_FUCHSIA = 1000366004,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_BUFFER_COLLECTION_BUFFER_CREATE_INFO_FUCHSIA = 1000366005,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_IMAGE_CONSTRAINTS_INFO_FUCHSIA = 1000366006,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_IMAGE_FORMAT_CONSTRAINTS_INFO_FUCHSIA = 1000366007,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_SYSMEM_COLOR_SPACE_FUCHSIA = 1000366008,
  // Provided by VK_FUCHSIA_buffer_collection
    VK_STRUCTURE_TYPE_BUFFER_COLLECTION_CONSTRAINTS_INFO_FUCHSIA = 1000366009,
  // Provided by VK_HUAWEI_subpass_shading
    VK_STRUCTURE_TYPE_SUBPASS_SHADING_PIPELINE_CREATE_INFO_HUAWEI = 1000369000,
  // Provided by VK_HUAWEI_subpass_shading
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_SHADING_FEATURES_HUAWEI = 1000369001,
  // Provided by VK_HUAWEI_subpass_shading
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_SHADING_PROPERTIES_HUAWEI = 1000369002,
  // Provided by VK_HUAWEI_invocation_mask
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INVOCATION_MASK_FEATURES_HUAWEI = 1000370000,
  // Provided by VK_NV_external_memory_rdma
    VK_STRUCTURE_TYPE_MEMORY_GET_REMOTE_ADDRESS_INFO_NV = 1000371000,
  // Provided by VK_NV_external_memory_rdma
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_RDMA_FEATURES_NV = 1000371001,
  // Provided by VK_EXT_pipeline_properties
    VK_STRUCTURE_TYPE_PIPELINE_PROPERTIES_IDENTIFIER_EXT = 1000372000,
  // Provided by VK_EXT_pipeline_properties
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROPERTIES_FEATURES_EXT = 1000372001,
  // Provided by VK_EXT_frame_boundary
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAME_BOUNDARY_FEATURES_EXT = 1000375000,
  // Provided by VK_EXT_frame_boundary
    VK_STRUCTURE_TYPE_FRAME_BOUNDARY_EXT = 1000375001,
  // Provided by VK_EXT_multisampled_render_to_single_sampled
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_FEATURES_EXT = 1000376000,
  // Provided by VK_EXT_multisampled_render_to_single_sampled
    VK_STRUCTURE_TYPE_SUBPASS_RESOLVE_PERFORMANCE_QUERY_EXT = 1000376001,
  // Provided by VK_EXT_multisampled_render_to_single_sampled
    VK_STRUCTURE_TYPE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_INFO_EXT = 1000376002,
  // Provided by VK_EXT_extended_dynamic_state2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_2_FEATURES_EXT = 1000377000,
  // Provided by VK_QNX_screen_surface
    VK_STRUCTURE_TYPE_SCREEN_SURFACE_CREATE_INFO_QNX = 1000378000,
  // Provided by VK_EXT_color_write_enable
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COLOR_WRITE_ENABLE_FEATURES_EXT = 1000381000,
  // Provided by VK_EXT_color_write_enable
    VK_STRUCTURE_TYPE_PIPELINE_COLOR_WRITE_CREATE_INFO_EXT = 1000381001,
  // Provided by VK_EXT_primitives_generated_query
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIMITIVES_GENERATED_QUERY_FEATURES_EXT = 1000382000,
  // Provided by VK_KHR_ray_tracing_maintenance1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_MAINTENANCE_1_FEATURES_KHR = 1000386000,
  // Provided by VK_KHR_shader_untyped_pointers
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNTYPED_POINTERS_FEATURES_KHR = 1000387000,
  // Provided by VK_VALVE_video_encode_rgb_conversion
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_RGB_CONVERSION_FEATURES_VALVE = 1000390000,
  // Provided by VK_VALVE_video_encode_rgb_conversion
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_RGB_CONVERSION_CAPABILITIES_VALVE = 1000390001,
  // Provided by VK_VALVE_video_encode_rgb_conversion
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_PROFILE_RGB_CONVERSION_INFO_VALVE = 1000390002,
  // Provided by VK_VALVE_video_encode_rgb_conversion
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_RGB_CONVERSION_CREATE_INFO_VALVE = 1000390003,
  // Provided by VK_EXT_image_view_min_lod
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_VIEW_MIN_LOD_FEATURES_EXT = 1000391000,
  // Provided by VK_EXT_image_view_min_lod
    VK_STRUCTURE_TYPE_IMAGE_VIEW_MIN_LOD_CREATE_INFO_EXT = 1000391001,
  // Provided by VK_EXT_multi_draw
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTI_DRAW_FEATURES_EXT = 1000392000,
  // Provided by VK_EXT_multi_draw
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTI_DRAW_PROPERTIES_EXT = 1000392001,
  // Provided by VK_EXT_image_2d_view_of_3d
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_2D_VIEW_OF_3D_FEATURES_EXT = 1000393000,
  // Provided by VK_EXT_shader_tile_image
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TILE_IMAGE_FEATURES_EXT = 1000395000,
  // Provided by VK_EXT_shader_tile_image
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TILE_IMAGE_PROPERTIES_EXT = 1000395001,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_MICROMAP_BUILD_INFO_EXT = 1000396000,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_MICROMAP_VERSION_INFO_EXT = 1000396001,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_COPY_MICROMAP_INFO_EXT = 1000396002,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_COPY_MICROMAP_TO_MEMORY_INFO_EXT = 1000396003,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_COPY_MEMORY_TO_MICROMAP_INFO_EXT = 1000396004,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_FEATURES_EXT = 1000396005,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPACITY_MICROMAP_PROPERTIES_EXT = 1000396006,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_MICROMAP_CREATE_INFO_EXT = 1000396007,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_MICROMAP_BUILD_SIZES_INFO_EXT = 1000396008,
  // Provided by VK_EXT_opacity_micromap
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_OPACITY_MICROMAP_EXT = 1000396009,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISPLACEMENT_MICROMAP_FEATURES_NV = 1000397000,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISPLACEMENT_MICROMAP_PROPERTIES_NV = 1000397001,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_NV_displacement_micromap
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_TRIANGLES_DISPLACEMENT_MICROMAP_NV = 1000397002,
#endif
  // Provided by VK_HUAWEI_cluster_culling_shader
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_FEATURES_HUAWEI = 1000404000,
  // Provided by VK_HUAWEI_cluster_culling_shader
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_PROPERTIES_HUAWEI = 1000404001,
  // Provided by VK_HUAWEI_cluster_culling_shader
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_CULLING_SHADER_VRS_FEATURES_HUAWEI = 1000404002,
  // Provided by VK_EXT_border_color_swizzle
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BORDER_COLOR_SWIZZLE_FEATURES_EXT = 1000411000,
  // Provided by VK_EXT_border_color_swizzle
    VK_STRUCTURE_TYPE_SAMPLER_BORDER_COLOR_COMPONENT_MAPPING_CREATE_INFO_EXT = 1000411001,
  // Provided by VK_EXT_pageable_device_local_memory
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PAGEABLE_DEVICE_LOCAL_MEMORY_FEATURES_EXT = 1000412000,
  // Provided by VK_ARM_shader_core_properties
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_PROPERTIES_ARM = 1000415000,
  // Provided by VK_ARM_scheduling_controls
    VK_STRUCTURE_TYPE_DEVICE_QUEUE_SHADER_CORE_CONTROL_CREATE_INFO_ARM = 1000417000,
  // Provided by VK_ARM_scheduling_controls
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_FEATURES_ARM = 1000417001,
  // Provided by VK_ARM_scheduling_controls
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCHEDULING_CONTROLS_PROPERTIES_ARM = 1000417002,
  // Provided by VK_EXT_image_sliced_view_of_3d
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_SLICED_VIEW_OF_3D_FEATURES_EXT = 1000418000,
  // Provided by VK_EXT_image_sliced_view_of_3d
    VK_STRUCTURE_TYPE_IMAGE_VIEW_SLICED_CREATE_INFO_EXT = 1000418001,
  // Provided by VK_VALVE_descriptor_set_host_mapping
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_SET_HOST_MAPPING_FEATURES_VALVE = 1000420000,
  // Provided by VK_VALVE_descriptor_set_host_mapping
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_BINDING_REFERENCE_VALVE = 1000420001,
  // Provided by VK_VALVE_descriptor_set_host_mapping
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_HOST_MAPPING_INFO_VALVE = 1000420002,
  // Provided by VK_EXT_non_seamless_cube_map
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NON_SEAMLESS_CUBE_MAP_FEATURES_EXT = 1000422000,
  // Provided by VK_ARM_render_pass_striped
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RENDER_PASS_STRIPED_FEATURES_ARM = 1000424000,
  // Provided by VK_ARM_render_pass_striped
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RENDER_PASS_STRIPED_PROPERTIES_ARM = 1000424001,
  // Provided by VK_ARM_render_pass_striped
    VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_BEGIN_INFO_ARM = 1000424002,
  // Provided by VK_ARM_render_pass_striped
    VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_INFO_ARM = 1000424003,
  // Provided by VK_ARM_render_pass_striped
    VK_STRUCTURE_TYPE_RENDER_PASS_STRIPE_SUBMIT_INFO_ARM = 1000424004,
  // Provided by VK_NV_copy_memory_indirect
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_FEATURES_NV = 1000426000,
  // Provided by VK_NV_device_generated_commands_compute
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_COMPUTE_FEATURES_NV = 1000428000,
  // Provided by VK_NV_device_generated_commands_compute
    VK_STRUCTURE_TYPE_COMPUTE_PIPELINE_INDIRECT_BUFFER_INFO_NV = 1000428001,
  // Provided by VK_NV_device_generated_commands_compute
    VK_STRUCTURE_TYPE_PIPELINE_INDIRECT_DEVICE_ADDRESS_INFO_NV = 1000428002,
  // Provided by VK_NV_ray_tracing_linear_swept_spheres
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_LINEAR_SWEPT_SPHERES_FEATURES_NV = 1000429008,
  // Provided by VK_NV_ray_tracing_linear_swept_spheres
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_LINEAR_SWEPT_SPHERES_DATA_NV = 1000429009,
  // Provided by VK_NV_ray_tracing_linear_swept_spheres
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_GEOMETRY_SPHERES_DATA_NV = 1000429010,
  // Provided by VK_NV_linear_color_attachment
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINEAR_COLOR_ATTACHMENT_FEATURES_NV = 1000430000,
  // Provided by VK_KHR_shader_maximal_reconvergence
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MAXIMAL_RECONVERGENCE_FEATURES_KHR = 1000434000,
  // Provided by VK_EXT_image_compression_control_swapchain
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_COMPRESSION_CONTROL_SWAPCHAIN_FEATURES_EXT = 1000437000,
  // Provided by VK_QCOM_image_processing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_FEATURES_QCOM = 1000440000,
  // Provided by VK_QCOM_image_processing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_PROPERTIES_QCOM = 1000440001,
  // Provided by VK_QCOM_image_processing
    VK_STRUCTURE_TYPE_IMAGE_VIEW_SAMPLE_WEIGHT_CREATE_INFO_QCOM = 1000440002,
  // Provided by VK_EXT_nested_command_buffer
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_FEATURES_EXT = 1000451000,
  // Provided by VK_EXT_nested_command_buffer
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_NESTED_COMMAND_BUFFER_PROPERTIES_EXT = 1000451001,
  // Provided by VK_OHOS_external_memory
    VK_STRUCTURE_TYPE_NATIVE_BUFFER_USAGE_OHOS = 1000452000,
  // Provided by VK_OHOS_external_memory
    VK_STRUCTURE_TYPE_NATIVE_BUFFER_PROPERTIES_OHOS = 1000452001,
  // Provided by VK_OHOS_external_memory
    VK_STRUCTURE_TYPE_NATIVE_BUFFER_FORMAT_PROPERTIES_OHOS = 1000452002,
  // Provided by VK_OHOS_external_memory
    VK_STRUCTURE_TYPE_IMPORT_NATIVE_BUFFER_INFO_OHOS = 1000452003,
  // Provided by VK_OHOS_external_memory
    VK_STRUCTURE_TYPE_MEMORY_GET_NATIVE_BUFFER_INFO_OHOS = 1000452004,
  // Provided by VK_OHOS_external_memory
    VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_OHOS = 1000452005,
  // Provided by VK_EXT_external_memory_acquire_unmodified
    VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_ACQUIRE_UNMODIFIED_EXT = 1000453000,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_3_FEATURES_EXT = 1000455000,
  // Provided by VK_EXT_extended_dynamic_state3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_DYNAMIC_STATE_3_PROPERTIES_EXT = 1000455001,
  // Provided by VK_EXT_subpass_merge_feedback
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBPASS_MERGE_FEEDBACK_FEATURES_EXT = 1000458000,
  // Provided by VK_EXT_subpass_merge_feedback
    VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_CONTROL_EXT = 1000458001,
  // Provided by VK_EXT_subpass_merge_feedback
    VK_STRUCTURE_TYPE_RENDER_PASS_CREATION_FEEDBACK_CREATE_INFO_EXT = 1000458002,
  // Provided by VK_EXT_subpass_merge_feedback
    VK_STRUCTURE_TYPE_RENDER_PASS_SUBPASS_FEEDBACK_CREATE_INFO_EXT = 1000458003,
  // Provided by VK_LUNARG_direct_driver_loading
    VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_INFO_LUNARG = 1000459000,
  // Provided by VK_LUNARG_direct_driver_loading
    VK_STRUCTURE_TYPE_DIRECT_DRIVER_LOADING_LIST_LUNARG = 1000459001,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_CREATE_INFO_ARM = 1000460000,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_VIEW_CREATE_INFO_ARM = 1000460001,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_BIND_TENSOR_MEMORY_INFO_ARM = 1000460002,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_TENSOR_ARM = 1000460003,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TENSOR_PROPERTIES_ARM = 1000460004,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_FORMAT_PROPERTIES_ARM = 1000460005,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_DESCRIPTION_ARM = 1000460006,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_MEMORY_REQUIREMENTS_INFO_ARM = 1000460007,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_MEMORY_BARRIER_ARM = 1000460008,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TENSOR_FEATURES_ARM = 1000460009,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_DEVICE_TENSOR_MEMORY_REQUIREMENTS_ARM = 1000460010,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_COPY_TENSOR_INFO_ARM = 1000460011,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_COPY_ARM = 1000460012,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_DEPENDENCY_INFO_ARM = 1000460013,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_TENSOR_ARM = 1000460014,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_TENSOR_INFO_ARM = 1000460015,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_EXTERNAL_TENSOR_PROPERTIES_ARM = 1000460016,
  // Provided by VK_ARM_tensors
    VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_TENSOR_CREATE_INFO_ARM = 1000460017,
  // Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_FEATURES_ARM = 1000460018,
  // Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_BUFFER_TENSOR_PROPERTIES_ARM = 1000460019,
  // Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
    VK_STRUCTURE_TYPE_DESCRIPTOR_GET_TENSOR_INFO_ARM = 1000460020,
  // Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_CAPTURE_DESCRIPTOR_DATA_INFO_ARM = 1000460021,
  // Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
    VK_STRUCTURE_TYPE_TENSOR_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_ARM = 1000460022,
  // Provided by VK_EXT_frame_boundary with VK_ARM_tensors
    VK_STRUCTURE_TYPE_FRAME_BOUNDARY_TENSORS_ARM = 1000460023,
  // Provided by VK_EXT_shader_module_identifier
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MODULE_IDENTIFIER_FEATURES_EXT = 1000462000,
  // Provided by VK_EXT_shader_module_identifier
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MODULE_IDENTIFIER_PROPERTIES_EXT = 1000462001,
  // Provided by VK_EXT_shader_module_identifier
    VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_MODULE_IDENTIFIER_CREATE_INFO_EXT = 1000462002,
  // Provided by VK_EXT_shader_module_identifier
    VK_STRUCTURE_TYPE_SHADER_MODULE_IDENTIFIER_EXT = 1000462003,
  // Provided by VK_EXT_rasterization_order_attachment_access
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_FEATURES_EXT = 1000342000,
  // Provided by VK_NV_optical_flow
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPTICAL_FLOW_FEATURES_NV = 1000464000,
  // Provided by VK_NV_optical_flow
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_OPTICAL_FLOW_PROPERTIES_NV = 1000464001,
  // Provided by VK_NV_optical_flow
    VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_INFO_NV = 1000464002,
  // Provided by VK_NV_optical_flow
    VK_STRUCTURE_TYPE_OPTICAL_FLOW_IMAGE_FORMAT_PROPERTIES_NV = 1000464003,
  // Provided by VK_NV_optical_flow
    VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_INFO_NV = 1000464004,
  // Provided by VK_NV_optical_flow
    VK_STRUCTURE_TYPE_OPTICAL_FLOW_EXECUTE_INFO_NV = 1000464005,
  // Provided by VK_NV_optical_flow
    VK_STRUCTURE_TYPE_OPTICAL_FLOW_SESSION_CREATE_PRIVATE_DATA_INFO_NV = 1000464010,
  // Provided by VK_EXT_legacy_dithering
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_DITHERING_FEATURES_EXT = 1000465000,
  // Provided by VK_ANDROID_external_format_resolve
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FORMAT_RESOLVE_FEATURES_ANDROID = 1000468000,
  // Provided by VK_ANDROID_external_format_resolve
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FORMAT_RESOLVE_PROPERTIES_ANDROID = 1000468001,
  // Provided by VK_ANDROID_external_format_resolve
    VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_RESOLVE_PROPERTIES_ANDROID = 1000468002,
  // Provided by VK_AMD_anti_lag
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ANTI_LAG_FEATURES_AMD = 1000476000,
  // Provided by VK_AMD_anti_lag
    VK_STRUCTURE_TYPE_ANTI_LAG_DATA_AMD = 1000476001,
  // Provided by VK_AMD_anti_lag
    VK_STRUCTURE_TYPE_ANTI_LAG_PRESENTATION_INFO_AMD = 1000476002,
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_dense_geometry_format
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DENSE_GEOMETRY_FORMAT_FEATURES_AMDX = 1000478000,
#endif
#ifdef VK_ENABLE_BETA_EXTENSIONS
  // Provided by VK_AMDX_dense_geometry_format
    VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_DENSE_GEOMETRY_FORMAT_TRIANGLES_DATA_AMDX = 1000478001,
#endif
  // Provided by VK_KHR_present_id2
    VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_ID_2_KHR = 1000479000,
  // Provided by VK_KHR_present_id2
    VK_STRUCTURE_TYPE_PRESENT_ID_2_KHR = 1000479001,
  // Provided by VK_KHR_present_id2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_ID_2_FEATURES_KHR = 1000479002,
  // Provided by VK_KHR_present_wait2
    VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_PRESENT_WAIT_2_KHR = 1000480000,
  // Provided by VK_KHR_present_wait2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_WAIT_2_FEATURES_KHR = 1000480001,
  // Provided by VK_KHR_present_wait2
    VK_STRUCTURE_TYPE_PRESENT_WAIT_2_INFO_KHR = 1000480002,
  // Provided by VK_KHR_ray_tracing_position_fetch
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_POSITION_FETCH_FEATURES_KHR = 1000481000,
  // Provided by VK_EXT_shader_object
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_FEATURES_EXT = 1000482000,
  // Provided by VK_EXT_shader_object
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OBJECT_PROPERTIES_EXT = 1000482001,
  // Provided by VK_EXT_shader_object
    VK_STRUCTURE_TYPE_SHADER_CREATE_INFO_EXT = 1000482002,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_BINARY_FEATURES_KHR = 1000483000,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PIPELINE_BINARY_CREATE_INFO_KHR = 1000483001,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PIPELINE_BINARY_INFO_KHR = 1000483002,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PIPELINE_BINARY_KEY_KHR = 1000483003,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_BINARY_PROPERTIES_KHR = 1000483004,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_RELEASE_CAPTURED_PIPELINE_DATA_INFO_KHR = 1000483005,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PIPELINE_BINARY_DATA_INFO_KHR = 1000483006,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PIPELINE_CREATE_INFO_KHR = 1000483007,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_DEVICE_PIPELINE_BINARY_INTERNAL_CACHE_CONTROL_KHR = 1000483008,
  // Provided by VK_KHR_pipeline_binary
    VK_STRUCTURE_TYPE_PIPELINE_BINARY_HANDLES_INFO_KHR = 1000483009,
  // Provided by VK_QCOM_tile_properties
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_PROPERTIES_FEATURES_QCOM = 1000484000,
  // Provided by VK_QCOM_tile_properties
    VK_STRUCTURE_TYPE_TILE_PROPERTIES_QCOM = 1000484001,
  // Provided by VK_SEC_amigo_profiling
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_AMIGO_PROFILING_FEATURES_SEC = 1000485000,
  // Provided by VK_SEC_amigo_profiling
    VK_STRUCTURE_TYPE_AMIGO_PROFILING_SUBMIT_INFO_SEC = 1000485001,
  // Provided by VK_KHR_surface_maintenance1
    VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_KHR = 1000274000,
  // Provided by VK_KHR_surface_maintenance1
    VK_STRUCTURE_TYPE_SURFACE_PRESENT_SCALING_CAPABILITIES_KHR = 1000274001,
  // Provided by VK_KHR_surface_maintenance1
    VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_COMPATIBILITY_KHR = 1000274002,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SWAPCHAIN_MAINTENANCE_1_FEATURES_KHR = 1000275000,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_FENCE_INFO_KHR = 1000275001,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODES_CREATE_INFO_KHR = 1000275002,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODE_INFO_KHR = 1000275003,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_SCALING_CREATE_INFO_KHR = 1000275004,
  // Provided by VK_KHR_swapchain_maintenance1
    VK_STRUCTURE_TYPE_RELEASE_SWAPCHAIN_IMAGES_INFO_KHR = 1000275005,
  // Provided by VK_QCOM_multiview_per_view_viewports
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_VIEWPORTS_FEATURES_QCOM = 1000488000,
  // Provided by VK_NV_ray_tracing_invocation_reorder
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_FEATURES_NV = 1000490000,
  // Provided by VK_NV_ray_tracing_invocation_reorder
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_NV = 1000490001,
  // Provided by VK_NV_cooperative_vector
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_VECTOR_FEATURES_NV = 1000491000,
  // Provided by VK_NV_cooperative_vector
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_VECTOR_PROPERTIES_NV = 1000491001,
  // Provided by VK_NV_cooperative_vector
    VK_STRUCTURE_TYPE_COOPERATIVE_VECTOR_PROPERTIES_NV = 1000491002,
  // Provided by VK_NV_cooperative_vector
    VK_STRUCTURE_TYPE_CONVERT_COOPERATIVE_VECTOR_MATRIX_INFO_NV = 1000491004,
  // Provided by VK_NV_extended_sparse_address_space
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_FEATURES_NV = 1000492000,
  // Provided by VK_NV_extended_sparse_address_space
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTENDED_SPARSE_ADDRESS_SPACE_PROPERTIES_NV = 1000492001,
  // Provided by VK_EXT_mutable_descriptor_type
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MUTABLE_DESCRIPTOR_TYPE_FEATURES_EXT = 1000351000,
  // Provided by VK_EXT_mutable_descriptor_type
    VK_STRUCTURE_TYPE_MUTABLE_DESCRIPTOR_TYPE_CREATE_INFO_EXT = 1000351002,
  // Provided by VK_EXT_legacy_vertex_attributes
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_VERTEX_ATTRIBUTES_FEATURES_EXT = 1000495000,
  // Provided by VK_EXT_legacy_vertex_attributes
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_VERTEX_ATTRIBUTES_PROPERTIES_EXT = 1000495001,
  // Provided by VK_EXT_layer_settings
    VK_STRUCTURE_TYPE_LAYER_SETTINGS_CREATE_INFO_EXT = 1000496000,
  // Provided by VK_ARM_shader_core_builtins
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_BUILTINS_FEATURES_ARM = 1000497000,
  // Provided by VK_ARM_shader_core_builtins
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_CORE_BUILTINS_PROPERTIES_ARM = 1000497001,
  // Provided by VK_EXT_pipeline_library_group_handles
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_LIBRARY_GROUP_HANDLES_FEATURES_EXT = 1000498000,
  // Provided by VK_EXT_dynamic_rendering_unused_attachments
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_UNUSED_ATTACHMENTS_FEATURES_EXT = 1000499000,
  // Provided by VK_KHR_internally_synchronized_queues
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INTERNALLY_SYNCHRONIZED_QUEUES_FEATURES_KHR = 1000504000,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_LATENCY_SLEEP_MODE_INFO_NV = 1000505000,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_LATENCY_SLEEP_INFO_NV = 1000505001,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_SET_LATENCY_MARKER_INFO_NV = 1000505002,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_GET_LATENCY_MARKER_INFO_NV = 1000505003,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_LATENCY_TIMINGS_FRAME_REPORT_NV = 1000505004,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_LATENCY_SUBMISSION_PRESENT_ID_NV = 1000505005,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_OUT_OF_BAND_QUEUE_TYPE_INFO_NV = 1000505006,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_SWAPCHAIN_LATENCY_CREATE_INFO_NV = 1000505007,
  // Provided by VK_NV_low_latency2
    VK_STRUCTURE_TYPE_LATENCY_SURFACE_CAPABILITIES_NV = 1000505008,
  // Provided by VK_KHR_cooperative_matrix
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_FEATURES_KHR = 1000506000,
  // Provided by VK_KHR_cooperative_matrix
    VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_PROPERTIES_KHR = 1000506001,
  // Provided by VK_KHR_cooperative_matrix
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_PROPERTIES_KHR = 1000506002,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CREATE_INFO_ARM = 1000507000,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_CREATE_INFO_ARM = 1000507001,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_RESOURCE_INFO_ARM = 1000507002,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_ARM = 1000507003,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_MEMORY_REQUIREMENTS_INFO_ARM = 1000507004,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_BIND_DATA_GRAPH_PIPELINE_SESSION_MEMORY_INFO_ARM = 1000507005,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_FEATURES_ARM = 1000507006,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SHADER_MODULE_CREATE_INFO_ARM = 1000507007,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_PROPERTY_QUERY_RESULT_ARM = 1000507008,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_INFO_ARM = 1000507009,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_COMPILER_CONTROL_CREATE_INFO_ARM = 1000507010,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENTS_INFO_ARM = 1000507011,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENT_ARM = 1000507012,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_IDENTIFIER_CREATE_INFO_ARM = 1000507013,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_DISPATCH_INFO_ARM = 1000507014,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_DATA_GRAPH_PROCESSING_ENGINE_CREATE_INFO_ARM = 1000507016,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_PROPERTIES_ARM = 1000507017,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROPERTIES_ARM = 1000507018,
  // Provided by VK_ARM_data_graph
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_INFO_ARM = 1000507019,
  // Provided by VK_ARM_data_graph with VK_ARM_tensors
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_TENSOR_SEMI_STRUCTURED_SPARSITY_INFO_ARM = 1000507015,
  // Provided by VK_QCOM_multiview_per_view_render_areas
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PER_VIEW_RENDER_AREAS_FEATURES_QCOM = 1000510000,
  // Provided by VK_QCOM_multiview_per_view_render_areas
    VK_STRUCTURE_TYPE_MULTIVIEW_PER_VIEW_RENDER_AREAS_RENDER_PASS_BEGIN_INFO_QCOM = 1000510001,
  // Provided by VK_KHR_compute_shader_derivatives
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_FEATURES_KHR = 1000201000,
  // Provided by VK_KHR_compute_shader_derivatives
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_PROPERTIES_KHR = 1000511000,
  // Provided by VK_KHR_video_decode_av1
    VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_CAPABILITIES_KHR = 1000512000,
  // Provided by VK_KHR_video_decode_av1
    VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_PICTURE_INFO_KHR = 1000512001,
  // Provided by VK_KHR_video_decode_av1
    VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_PROFILE_INFO_KHR = 1000512003,
  // Provided by VK_KHR_video_decode_av1
    VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000512004,
  // Provided by VK_KHR_video_decode_av1
    VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_DPB_SLOT_INFO_KHR = 1000512005,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_CAPABILITIES_KHR = 1000513000,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000513001,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_PICTURE_INFO_KHR = 1000513002,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_DPB_SLOT_INFO_KHR = 1000513003,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_AV1_FEATURES_KHR = 1000513004,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_PROFILE_INFO_KHR = 1000513005,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_RATE_CONTROL_INFO_KHR = 1000513006,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_RATE_CONTROL_LAYER_INFO_KHR = 1000513007,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_QUALITY_LEVEL_PROPERTIES_KHR = 1000513008,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_SESSION_CREATE_INFO_KHR = 1000513009,
  // Provided by VK_KHR_video_encode_av1
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_GOP_REMAINING_FRAME_INFO_KHR = 1000513010,
  // Provided by VK_KHR_video_decode_vp9
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_DECODE_VP9_FEATURES_KHR = 1000514000,
  // Provided by VK_KHR_video_decode_vp9
    VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_CAPABILITIES_KHR = 1000514001,
  // Provided by VK_KHR_video_decode_vp9
    VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PICTURE_INFO_KHR = 1000514002,
  // Provided by VK_KHR_video_decode_vp9
    VK_STRUCTURE_TYPE_VIDEO_DECODE_VP9_PROFILE_INFO_KHR = 1000514003,
  // Provided by VK_KHR_video_maintenance1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_1_FEATURES_KHR = 1000515000,
  // Provided by VK_KHR_video_maintenance1
    VK_STRUCTURE_TYPE_VIDEO_INLINE_QUERY_INFO_KHR = 1000515001,
  // Provided by VK_NV_per_stage_descriptor_set
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PER_STAGE_DESCRIPTOR_SET_FEATURES_NV = 1000516000,
  // Provided by VK_QCOM_image_processing2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_2_FEATURES_QCOM = 1000518000,
  // Provided by VK_QCOM_image_processing2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_PROCESSING_2_PROPERTIES_QCOM = 1000518001,
  // Provided by VK_QCOM_image_processing2
    VK_STRUCTURE_TYPE_SAMPLER_BLOCK_MATCH_WINDOW_CREATE_INFO_QCOM = 1000518002,
  // Provided by VK_QCOM_filter_cubic_weights
    VK_STRUCTURE_TYPE_SAMPLER_CUBIC_WEIGHTS_CREATE_INFO_QCOM = 1000519000,
  // Provided by VK_QCOM_filter_cubic_weights
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUBIC_WEIGHTS_FEATURES_QCOM = 1000519001,
  // Provided by VK_QCOM_filter_cubic_weights
    VK_STRUCTURE_TYPE_BLIT_IMAGE_CUBIC_WEIGHTS_INFO_QCOM = 1000519002,
  // Provided by VK_QCOM_ycbcr_degamma
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_YCBCR_DEGAMMA_FEATURES_QCOM = 1000520000,
  // Provided by VK_QCOM_ycbcr_degamma
    VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_YCBCR_DEGAMMA_CREATE_INFO_QCOM = 1000520001,
  // Provided by VK_QCOM_filter_cubic_clamp
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUBIC_CLAMP_FEATURES_QCOM = 1000521000,
  // Provided by VK_EXT_attachment_feedback_loop_dynamic_state
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ATTACHMENT_FEEDBACK_LOOP_DYNAMIC_STATE_FEATURES_EXT = 1000524000,
  // Provided by VK_KHR_unified_image_layouts
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFIED_IMAGE_LAYOUTS_FEATURES_KHR = 1000527000,
  // Provided by VK_KHR_unified_image_layouts with VK_EXT_attachment_feedback_loop_layout and (VK_VERSION_1_3 or VK_KHR_dynamic_rendering)
    VK_STRUCTURE_TYPE_ATTACHMENT_FEEDBACK_LOOP_INFO_EXT = 1000527001,
  // Provided by VK_QNX_external_memory_screen_buffer
    VK_STRUCTURE_TYPE_SCREEN_BUFFER_PROPERTIES_QNX = 1000529000,
  // Provided by VK_QNX_external_memory_screen_buffer
    VK_STRUCTURE_TYPE_SCREEN_BUFFER_FORMAT_PROPERTIES_QNX = 1000529001,
  // Provided by VK_QNX_external_memory_screen_buffer
    VK_STRUCTURE_TYPE_IMPORT_SCREEN_BUFFER_INFO_QNX = 1000529002,
  // Provided by VK_QNX_external_memory_screen_buffer
    VK_STRUCTURE_TYPE_EXTERNAL_FORMAT_QNX = 1000529003,
  // Provided by VK_QNX_external_memory_screen_buffer
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_MEMORY_SCREEN_BUFFER_FEATURES_QNX = 1000529004,
  // Provided by VK_MSFT_layered_driver
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_DRIVER_PROPERTIES_MSFT = 1000530000,
  // Provided by VK_KHR_calibrated_timestamps
    VK_STRUCTURE_TYPE_CALIBRATED_TIMESTAMP_INFO_KHR = 1000184000,
  // Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_SET_DESCRIPTOR_BUFFER_OFFSETS_INFO_EXT = 1000545007,
  // Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
    VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_BUFFER_EMBEDDED_SAMPLERS_INFO_EXT = 1000545008,
  // Provided by VK_NV_descriptor_pool_overallocation
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_POOL_OVERALLOCATION_FEATURES_NV = 1000546000,
  // Provided by VK_QCOM_tile_memory_heap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_MEMORY_HEAP_FEATURES_QCOM = 1000547000,
  // Provided by VK_QCOM_tile_memory_heap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TILE_MEMORY_HEAP_PROPERTIES_QCOM = 1000547001,
  // Provided by VK_QCOM_tile_memory_heap
    VK_STRUCTURE_TYPE_TILE_MEMORY_REQUIREMENTS_QCOM = 1000547002,
  // Provided by VK_QCOM_tile_memory_heap
    VK_STRUCTURE_TYPE_TILE_MEMORY_BIND_INFO_QCOM = 1000547003,
  // Provided by VK_QCOM_tile_memory_heap with VK_QCOM_tile_properties
    VK_STRUCTURE_TYPE_TILE_MEMORY_SIZE_INFO_QCOM = 1000547004,
  // Provided by VK_KHR_copy_memory_indirect
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_FEATURES_KHR = 1000549000,
  // Provided by VK_KHR_copy_memory_indirect
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_PROPERTIES_KHR = 1000426001,
  // Provided by VK_KHR_copy_memory_indirect
    VK_STRUCTURE_TYPE_COPY_MEMORY_INDIRECT_INFO_KHR = 1000549002,
  // Provided by VK_KHR_copy_memory_indirect
    VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INDIRECT_INFO_KHR = 1000549003,
  // Provided by VK_EXT_memory_decompression
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_FEATURES_EXT = 1000427000,
  // Provided by VK_EXT_memory_decompression
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_PROPERTIES_EXT = 1000427001,
  // Provided by VK_EXT_memory_decompression
    VK_STRUCTURE_TYPE_DECOMPRESS_MEMORY_INFO_EXT = 1000550002,
  // Provided by VK_NV_display_stereo
    VK_STRUCTURE_TYPE_DISPLAY_SURFACE_STEREO_CREATE_INFO_NV = 1000551000,
  // Provided by VK_NV_display_stereo
    VK_STRUCTURE_TYPE_DISPLAY_MODE_STEREO_PROPERTIES_NV = 1000551001,
  // Provided by VK_KHR_video_encode_intra_refresh
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_INTRA_REFRESH_CAPABILITIES_KHR = 1000552000,
  // Provided by VK_KHR_video_encode_intra_refresh
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_SESSION_INTRA_REFRESH_CREATE_INFO_KHR = 1000552001,
  // Provided by VK_KHR_video_encode_intra_refresh
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_INTRA_REFRESH_INFO_KHR = 1000552002,
  // Provided by VK_KHR_video_encode_intra_refresh
    VK_STRUCTURE_TYPE_VIDEO_REFERENCE_INTRA_REFRESH_INFO_KHR = 1000552003,
  // Provided by VK_KHR_video_encode_intra_refresh
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_INTRA_REFRESH_FEATURES_KHR = 1000552004,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_CAPABILITIES_KHR = 1000553000,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_FORMAT_QUANTIZATION_MAP_PROPERTIES_KHR = 1000553001,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_INFO_KHR = 1000553002,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_QUANTIZATION_MAP_SESSION_PARAMETERS_CREATE_INFO_KHR = 1000553005,
  // Provided by VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_ENCODE_QUANTIZATION_MAP_FEATURES_KHR = 1000553009,
  // Provided by VK_KHR_video_encode_h264 with VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H264_QUANTIZATION_MAP_CAPABILITIES_KHR = 1000553003,
  // Provided by VK_KHR_video_encode_h265 with VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_H265_QUANTIZATION_MAP_CAPABILITIES_KHR = 1000553004,
  // Provided by VK_KHR_video_encode_h265 with VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_FORMAT_H265_QUANTIZATION_MAP_PROPERTIES_KHR = 1000553006,
  // Provided by VK_KHR_video_encode_av1 with VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_ENCODE_AV1_QUANTIZATION_MAP_CAPABILITIES_KHR = 1000553007,
  // Provided by VK_KHR_video_encode_av1 with VK_KHR_video_encode_quantization_map
    VK_STRUCTURE_TYPE_VIDEO_FORMAT_AV1_QUANTIZATION_MAP_PROPERTIES_KHR = 1000553008,
  // Provided by VK_NV_raw_access_chains
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAW_ACCESS_CHAINS_FEATURES_NV = 1000555000,
  // Provided by VK_NV_external_compute_queue
    VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DEVICE_CREATE_INFO_NV = 1000556000,
  // Provided by VK_NV_external_compute_queue
    VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_CREATE_INFO_NV = 1000556001,
  // Provided by VK_NV_external_compute_queue
    VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DATA_PARAMS_NV = 1000556002,
  // Provided by VK_NV_external_compute_queue
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_COMPUTE_QUEUE_PROPERTIES_NV = 1000556003,
  // Provided by VK_KHR_shader_relaxed_extended_instruction
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_RELAXED_EXTENDED_INSTRUCTION_FEATURES_KHR = 1000558000,
  // Provided by VK_NV_command_buffer_inheritance
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMMAND_BUFFER_INHERITANCE_FEATURES_NV = 1000559000,
  // Provided by VK_KHR_maintenance7
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_FEATURES_KHR = 1000562000,
  // Provided by VK_KHR_maintenance7
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_7_PROPERTIES_KHR = 1000562001,
  // Provided by VK_KHR_maintenance7
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_LIST_KHR = 1000562002,
  // Provided by VK_KHR_maintenance7
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_PROPERTIES_KHR = 1000562003,
  // Provided by VK_KHR_maintenance7
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LAYERED_API_VULKAN_PROPERTIES_KHR = 1000562004,
  // Provided by VK_NV_shader_atomic_float16_vector
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_FLOAT16_VECTOR_FEATURES_NV = 1000563000,
  // Provided by VK_EXT_shader_replicated_composites
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_REPLICATED_COMPOSITES_FEATURES_EXT = 1000564000,
  // Provided by VK_EXT_shader_float8
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT8_FEATURES_EXT = 1000567000,
  // Provided by VK_NV_ray_tracing_validation
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_VALIDATION_FEATURES_NV = 1000568000,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_ACCELERATION_STRUCTURE_FEATURES_NV = 1000569000,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CLUSTER_ACCELERATION_STRUCTURE_PROPERTIES_NV = 1000569001,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_CLUSTERS_BOTTOM_LEVEL_INPUT_NV = 1000569002,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_TRIANGLE_CLUSTER_INPUT_NV = 1000569003,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_MOVE_OBJECTS_INPUT_NV = 1000569004,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_INPUT_INFO_NV = 1000569005,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_CLUSTER_ACCELERATION_STRUCTURE_COMMANDS_INFO_NV = 1000569006,
  // Provided by VK_NV_cluster_acceleration_structure
    VK_STRUCTURE_TYPE_RAY_TRACING_PIPELINE_CLUSTER_ACCELERATION_STRUCTURE_CREATE_INFO_NV = 1000569007,
  // Provided by VK_NV_partitioned_acceleration_structure
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_FEATURES_NV = 1000570000,
  // Provided by VK_NV_partitioned_acceleration_structure
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PARTITIONED_ACCELERATION_STRUCTURE_PROPERTIES_NV = 1000570001,
  // Provided by VK_NV_partitioned_acceleration_structure
    VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_PARTITIONED_ACCELERATION_STRUCTURE_NV = 1000570002,
  // Provided by VK_NV_partitioned_acceleration_structure
    VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_INSTANCES_INPUT_NV = 1000570003,
  // Provided by VK_NV_partitioned_acceleration_structure
    VK_STRUCTURE_TYPE_BUILD_PARTITIONED_ACCELERATION_STRUCTURE_INFO_NV = 1000570004,
  // Provided by VK_NV_partitioned_acceleration_structure
    VK_STRUCTURE_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_FLAGS_NV = 1000570005,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_FEATURES_EXT = 1000572000,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEVICE_GENERATED_COMMANDS_PROPERTIES_EXT = 1000572001,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_GENERATED_COMMANDS_MEMORY_REQUIREMENTS_INFO_EXT = 1000572002,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_CREATE_INFO_EXT = 1000572003,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_GENERATED_COMMANDS_INFO_EXT = 1000572004,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_CREATE_INFO_EXT = 1000572006,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_COMMANDS_LAYOUT_TOKEN_EXT = 1000572007,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_PIPELINE_EXT = 1000572008,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_WRITE_INDIRECT_EXECUTION_SET_SHADER_EXT = 1000572009,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_PIPELINE_INFO_EXT = 1000572010,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_INFO_EXT = 1000572011,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_INDIRECT_EXECUTION_SET_SHADER_LAYOUT_INFO_EXT = 1000572012,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_GENERATED_COMMANDS_PIPELINE_INFO_EXT = 1000572013,
  // Provided by VK_EXT_device_generated_commands
    VK_STRUCTURE_TYPE_GENERATED_COMMANDS_SHADER_INFO_EXT = 1000572014,
  // Provided by VK_KHR_maintenance8
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_8_FEATURES_KHR = 1000574000,
  // Provided by VK_KHR_maintenance8
    VK_STRUCTURE_TYPE_MEMORY_BARRIER_ACCESS_FLAGS_3_KHR = 1000574002,
  // Provided by VK_MESA_image_alignment_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ALIGNMENT_CONTROL_FEATURES_MESA = 1000575000,
  // Provided by VK_MESA_image_alignment_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ALIGNMENT_CONTROL_PROPERTIES_MESA = 1000575001,
  // Provided by VK_MESA_image_alignment_control
    VK_STRUCTURE_TYPE_IMAGE_ALIGNMENT_CONTROL_CREATE_INFO_MESA = 1000575002,
  // Provided by VK_KHR_shader_fma
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FMA_FEATURES_KHR = 1000579000,
  // Provided by VK_NV_push_constant_bank
    VK_STRUCTURE_TYPE_PUSH_CONSTANT_BANK_INFO_NV = 1000580000,
  // Provided by VK_NV_push_constant_bank
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_CONSTANT_BANK_FEATURES_NV = 1000580001,
  // Provided by VK_NV_push_constant_bank
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_CONSTANT_BANK_PROPERTIES_NV = 1000580002,
  // Provided by VK_EXT_ray_tracing_invocation_reorder
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_FEATURES_EXT = 1000581000,
  // Provided by VK_EXT_ray_tracing_invocation_reorder
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RAY_TRACING_INVOCATION_REORDER_PROPERTIES_EXT = 1000581001,
  // Provided by VK_EXT_depth_clamp_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_CONTROL_FEATURES_EXT = 1000582000,
  // Provided by VK_EXT_depth_clamp_control
    VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_DEPTH_CLAMP_CONTROL_CREATE_INFO_EXT = 1000582001,
  // Provided by VK_KHR_maintenance9
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_FEATURES_KHR = 1000584000,
  // Provided by VK_KHR_maintenance9
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_9_PROPERTIES_KHR = 1000584001,
  // Provided by VK_KHR_maintenance9
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_OWNERSHIP_TRANSFER_PROPERTIES_KHR = 1000584002,
  // Provided by VK_KHR_video_maintenance2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VIDEO_MAINTENANCE_2_FEATURES_KHR = 1000586000,
  // Provided by VK_KHR_video_decode_h264 with VK_KHR_video_maintenance2
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H264_INLINE_SESSION_PARAMETERS_INFO_KHR = 1000586001,
  // Provided by VK_KHR_video_decode_h265 with VK_KHR_video_maintenance2
    VK_STRUCTURE_TYPE_VIDEO_DECODE_H265_INLINE_SESSION_PARAMETERS_INFO_KHR = 1000586002,
  // Provided by VK_KHR_video_decode_av1 with VK_KHR_video_maintenance2
    VK_STRUCTURE_TYPE_VIDEO_DECODE_AV1_INLINE_SESSION_PARAMETERS_INFO_KHR = 1000586003,
  // Provided by VK_OHOS_surface
    VK_STRUCTURE_TYPE_SURFACE_CREATE_INFO_OHOS = 1000685000,
  // Provided by VK_HUAWEI_hdr_vivid
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HDR_VIVID_FEATURES_HUAWEI = 1000590000,
  // Provided by VK_HUAWEI_hdr_vivid
    VK_STRUCTURE_TYPE_HDR_VIVID_DYNAMIC_METADATA_HUAWEI = 1000590001,
  // Provided by VK_NV_cooperative_matrix2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_2_FEATURES_NV = 1000593000,
  // Provided by VK_NV_cooperative_matrix2
    VK_STRUCTURE_TYPE_COOPERATIVE_MATRIX_FLEXIBLE_DIMENSIONS_PROPERTIES_NV = 1000593001,
  // Provided by VK_NV_cooperative_matrix2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COOPERATIVE_MATRIX_2_PROPERTIES_NV = 1000593002,
  // Provided by VK_ARM_pipeline_opacity_micromap
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_OPACITY_MICROMAP_FEATURES_ARM = 1000596000,
  // Provided by VK_EXT_external_memory_metal
    VK_STRUCTURE_TYPE_IMPORT_MEMORY_METAL_HANDLE_INFO_EXT = 1000602000,
  // Provided by VK_EXT_external_memory_metal
    VK_STRUCTURE_TYPE_MEMORY_METAL_HANDLE_PROPERTIES_EXT = 1000602001,
  // Provided by VK_EXT_external_memory_metal
    VK_STRUCTURE_TYPE_MEMORY_GET_METAL_HANDLE_INFO_EXT = 1000602002,
  // Provided by VK_KHR_depth_clamp_zero_one
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_ZERO_ONE_FEATURES_KHR = 1000421000,
  // Provided by VK_ARM_performance_counters_by_region
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_COUNTERS_BY_REGION_FEATURES_ARM = 1000605000,
  // Provided by VK_ARM_performance_counters_by_region
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PERFORMANCE_COUNTERS_BY_REGION_PROPERTIES_ARM = 1000605001,
  // Provided by VK_ARM_performance_counters_by_region
    VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_ARM = 1000605002,
  // Provided by VK_ARM_performance_counters_by_region
    VK_STRUCTURE_TYPE_PERFORMANCE_COUNTER_DESCRIPTION_ARM = 1000605003,
  // Provided by VK_ARM_performance_counters_by_region
    VK_STRUCTURE_TYPE_RENDER_PASS_PERFORMANCE_COUNTERS_BY_REGION_BEGIN_INFO_ARM = 1000605004,
  // Provided by VK_ARM_shader_instrumentation
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INSTRUMENTATION_FEATURES_ARM = 1000607000,
  // Provided by VK_ARM_shader_instrumentation
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INSTRUMENTATION_PROPERTIES_ARM = 1000607001,
  // Provided by VK_ARM_shader_instrumentation
    VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_CREATE_INFO_ARM = 1000607002,
  // Provided by VK_ARM_shader_instrumentation
    VK_STRUCTURE_TYPE_SHADER_INSTRUMENTATION_METRIC_DESCRIPTION_ARM = 1000607003,
  // Provided by VK_EXT_vertex_attribute_robustness
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_ROBUSTNESS_FEATURES_EXT = 1000608000,
  // Provided by VK_ARM_format_pack
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FORMAT_PACK_FEATURES_ARM = 1000609000,
  // Provided by VK_VALVE_fragment_density_map_layered
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_LAYERED_FEATURES_VALVE = 1000611000,
  // Provided by VK_VALVE_fragment_density_map_layered
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_LAYERED_PROPERTIES_VALVE = 1000611001,
  // Provided by VK_VALVE_fragment_density_map_layered
    VK_STRUCTURE_TYPE_PIPELINE_FRAGMENT_DENSITY_MAP_LAYERED_CREATE_INFO_VALVE = 1000611002,
  // Provided by VK_KHR_robustness2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_FEATURES_KHR = 1000286000,
  // Provided by VK_KHR_robustness2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_PROPERTIES_KHR = 1000286001,
  // Provided by VK_NV_present_metering
    VK_STRUCTURE_TYPE_SET_PRESENT_CONFIG_NV = 1000613000,
  // Provided by VK_NV_present_metering
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_METERING_FEATURES_NV = 1000613001,
  // Provided by VK_EXT_fragment_density_map_offset
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_FEATURES_EXT = 1000425000,
  // Provided by VK_EXT_fragment_density_map_offset
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_PROPERTIES_EXT = 1000425001,
  // Provided by VK_EXT_fragment_density_map_offset
    VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_EXT = 1000425002,
  // Provided by VK_EXT_zero_initialize_device_memory
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_DEVICE_MEMORY_FEATURES_EXT = 1000620000,
  // Provided by VK_KHR_present_mode_fifo_latest_ready
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_MODE_FIFO_LATEST_READY_FEATURES_KHR = 1000361000,
  // Provided by VK_EXT_shader_64bit_indexing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_64_BIT_INDEXING_FEATURES_EXT = 1000627000,
  // Provided by VK_EXT_custom_resolve
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_CUSTOM_RESOLVE_FEATURES_EXT = 1000628000,
  // Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_STRUCTURE_TYPE_BEGIN_CUSTOM_RESOLVE_INFO_EXT = 1000628001,
  // Provided by VK_EXT_custom_resolve with VK_KHR_dynamic_rendering or VK_VERSION_1_3
    VK_STRUCTURE_TYPE_CUSTOM_RESOLVE_CREATE_INFO_EXT = 1000628002,
  // Provided by VK_QCOM_data_graph_model
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_MODEL_FEATURES_QCOM = 1000629000,
  // Provided by VK_QCOM_data_graph_model
    VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_BUILTIN_MODEL_CREATE_INFO_QCOM = 1000629001,
  // Provided by VK_KHR_maintenance10
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_FEATURES_KHR = 1000630000,
  // Provided by VK_KHR_maintenance10
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_10_PROPERTIES_KHR = 1000630001,
  // Provided by VK_KHR_maintenance10
    VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_FLAGS_INFO_KHR = 1000630002,
  // Provided by VK_KHR_maintenance10
    VK_STRUCTURE_TYPE_RENDERING_END_INFO_KHR = 1000619003,
  // Provided by VK_KHR_maintenance10
    VK_STRUCTURE_TYPE_RESOLVE_IMAGE_MODE_INFO_KHR = 1000630004,
  // Provided by VK_EXT_shader_long_vector
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_LONG_VECTOR_FEATURES_EXT = 1000635000,
  // Provided by VK_EXT_shader_long_vector
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_LONG_VECTOR_PROPERTIES_EXT = 1000635001,
  // Provided by VK_SEC_pipeline_cache_incremental_mode
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CACHE_INCREMENTAL_MODE_FEATURES_SEC = 1000637000,
  // Provided by VK_EXT_shader_uniform_buffer_unsized_array
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_UNIFORM_BUFFER_UNSIZED_ARRAY_FEATURES_EXT = 1000642000,
  // Provided by VK_NV_compute_occupancy_priority
    VK_STRUCTURE_TYPE_COMPUTE_OCCUPANCY_PRIORITY_PARAMETERS_NV = 1000645000,
  // Provided by VK_NV_compute_occupancy_priority
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_OCCUPANCY_PRIORITY_FEATURES_NV = 1000645001,
  // Provided by VK_EXT_shader_subgroup_partitioned
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_PARTITIONED_FEATURES_EXT = 1000662000,
  // Provided by VK_SEC_ubm_surface
    VK_STRUCTURE_TYPE_UBM_SURFACE_CREATE_INFO_SEC = 1000664000,
  // Provided by VK_VALVE_shader_mixed_float_dot_product
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_MIXED_FLOAT_DOT_PRODUCT_FEATURES_VALVE = 1000673000,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTER_FEATURES = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES,
  // Provided by VK_VERSION_1_1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETER_FEATURES = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DRAW_PARAMETERS_FEATURES,
  // Provided by VK_EXT_debug_report
  // VK_STRUCTURE_TYPE_DEBUG_REPORT_CREATE_INFO_EXT is a legacy alias
    VK_STRUCTURE_TYPE_DEBUG_REPORT_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_DEBUG_REPORT_CALLBACK_CREATE_INFO_EXT,
  // Provided by VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_RENDERING_INFO_KHR = VK_STRUCTURE_TYPE_RENDERING_INFO,
  // Provided by VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO_KHR = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_INFO,
  // Provided by VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_PIPELINE_RENDERING_CREATE_INFO,
  // Provided by VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_FEATURES,
  // Provided by VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO_KHR = VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_RENDERING_INFO,
  // Provided by VK_KHR_multiview
    VK_STRUCTURE_TYPE_RENDER_PASS_MULTIVIEW_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_RENDER_PASS_MULTIVIEW_CREATE_INFO,
  // Provided by VK_KHR_multiview
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_FEATURES,
  // Provided by VK_KHR_multiview
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MULTIVIEW_PROPERTIES,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PROPERTIES_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2_KHR = VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2_KHR = VK_STRUCTURE_TYPE_IMAGE_FORMAT_PROPERTIES_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_FORMAT_INFO_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2_KHR = VK_STRUCTURE_TYPE_QUEUE_FAMILY_PROPERTIES_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2_KHR = VK_STRUCTURE_TYPE_SPARSE_IMAGE_FORMAT_PROPERTIES_2,
  // Provided by VK_KHR_get_physical_device_properties2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2,
  // Provided by VK_KHR_device_group
    VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO_KHR = VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO,
  // Provided by VK_KHR_device_group
    VK_STRUCTURE_TYPE_DEVICE_GROUP_RENDER_PASS_BEGIN_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_GROUP_RENDER_PASS_BEGIN_INFO,
  // Provided by VK_KHR_device_group
    VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_GROUP_COMMAND_BUFFER_BEGIN_INFO,
  // Provided by VK_KHR_device_group
    VK_STRUCTURE_TYPE_DEVICE_GROUP_SUBMIT_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_GROUP_SUBMIT_INFO,
  // Provided by VK_KHR_device_group
    VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_GROUP_BIND_SPARSE_INFO,
  // Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
    VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO_KHR = VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_DEVICE_GROUP_INFO,
  // Provided by VK_KHR_bind_memory2 with VK_KHR_device_group
    VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO_KHR = VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_DEVICE_GROUP_INFO,
  // Provided by VK_EXT_texture_compression_astc_hdr
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXTURE_COMPRESSION_ASTC_HDR_FEATURES,
  // Provided by VK_EXT_pipeline_robustness
    VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO,
  // Provided by VK_EXT_pipeline_robustness
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES,
  // Provided by VK_EXT_pipeline_robustness
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES,
  // Provided by VK_KHR_device_group_creation
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GROUP_PROPERTIES,
  // Provided by VK_KHR_device_group_creation
    VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_GROUP_DEVICE_CREATE_INFO,
  // Provided by VK_KHR_external_memory_capabilities
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO,
  // Provided by VK_KHR_external_memory_capabilities
    VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES_KHR = VK_STRUCTURE_TYPE_EXTERNAL_IMAGE_FORMAT_PROPERTIES,
  // Provided by VK_KHR_external_memory_capabilities
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_BUFFER_INFO,
  // Provided by VK_KHR_external_memory_capabilities
    VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES_KHR = VK_STRUCTURE_TYPE_EXTERNAL_BUFFER_PROPERTIES,
  // Provided by VK_KHR_external_fence_capabilities, VK_KHR_external_memory_capabilities, VK_KHR_external_semaphore_capabilities
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ID_PROPERTIES,
  // Provided by VK_KHR_external_memory
    VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_BUFFER_CREATE_INFO,
  // Provided by VK_KHR_external_memory
    VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_EXTERNAL_MEMORY_IMAGE_CREATE_INFO,
  // Provided by VK_KHR_external_memory
    VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO_KHR = VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_SEMAPHORE_INFO,
  // Provided by VK_KHR_external_semaphore_capabilities
    VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES_KHR = VK_STRUCTURE_TYPE_EXTERNAL_SEMAPHORE_PROPERTIES,
  // Provided by VK_KHR_external_semaphore
    VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_EXPORT_SEMAPHORE_CREATE_INFO,
  // Provided by VK_KHR_push_descriptor
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PUSH_DESCRIPTOR_PROPERTIES,
  // Provided by VK_KHR_shader_float16_int8
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES,
  // Provided by VK_KHR_shader_float16_int8
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT16_INT8_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT16_INT8_FEATURES,
  // Provided by VK_KHR_16bit_storage
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_16BIT_STORAGE_FEATURES,
  // Provided by VK_KHR_descriptor_update_template
    VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_DESCRIPTOR_UPDATE_TEMPLATE_CREATE_INFO,
  // Provided by VK_EXT_display_surface_counter
  // VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES2_EXT is a legacy alias
    VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES2_EXT = VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_EXT,
  // Provided by VK_KHR_imageless_framebuffer
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGELESS_FRAMEBUFFER_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGELESS_FRAMEBUFFER_FEATURES,
  // Provided by VK_KHR_imageless_framebuffer
    VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENTS_CREATE_INFO,
  // Provided by VK_KHR_imageless_framebuffer
    VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO_KHR = VK_STRUCTURE_TYPE_FRAMEBUFFER_ATTACHMENT_IMAGE_INFO,
  // Provided by VK_KHR_imageless_framebuffer
    VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO_KHR = VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO,
  // Provided by VK_KHR_create_renderpass2
    VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2_KHR = VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2,
  // Provided by VK_KHR_create_renderpass2
    VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2_KHR = VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2,
  // Provided by VK_KHR_create_renderpass2
    VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2_KHR = VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2,
  // Provided by VK_KHR_create_renderpass2
    VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2_KHR = VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2,
  // Provided by VK_KHR_create_renderpass2
    VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2_KHR = VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2,
  // Provided by VK_KHR_create_renderpass2
    VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO_KHR = VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO,
  // Provided by VK_KHR_create_renderpass2
    VK_STRUCTURE_TYPE_SUBPASS_END_INFO_KHR = VK_STRUCTURE_TYPE_SUBPASS_END_INFO,
  // Provided by VK_KHR_external_fence_capabilities
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FENCE_INFO_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_FENCE_INFO,
  // Provided by VK_KHR_external_fence_capabilities
    VK_STRUCTURE_TYPE_EXTERNAL_FENCE_PROPERTIES_KHR = VK_STRUCTURE_TYPE_EXTERNAL_FENCE_PROPERTIES,
  // Provided by VK_KHR_external_fence
    VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_EXPORT_FENCE_CREATE_INFO,
  // Provided by VK_KHR_maintenance2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_POINT_CLIPPING_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_POINT_CLIPPING_PROPERTIES,
  // Provided by VK_KHR_maintenance2
    VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO,
  // Provided by VK_KHR_maintenance2
    VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_IMAGE_VIEW_USAGE_CREATE_INFO,
  // Provided by VK_KHR_maintenance2
    VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_DOMAIN_ORIGIN_STATE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_PIPELINE_TESSELLATION_DOMAIN_ORIGIN_STATE_CREATE_INFO,
  // Provided by VK_KHR_variable_pointers
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES,
  // Provided by VK_KHR_variable_pointers
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTER_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VARIABLE_POINTERS_FEATURES_KHR,
  // Provided by VK_KHR_dedicated_allocation
    VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS_KHR = VK_STRUCTURE_TYPE_MEMORY_DEDICATED_REQUIREMENTS,
  // Provided by VK_KHR_dedicated_allocation
    VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_KHR = VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_FILTER_MINMAX_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_FILTER_MINMAX_PROPERTIES,
  // Provided by VK_EXT_sampler_filter_minmax
    VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_SAMPLER_REDUCTION_MODE_CREATE_INFO,
  // Provided by VK_EXT_inline_uniform_block
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_FEATURES,
  // Provided by VK_EXT_inline_uniform_block
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INLINE_UNIFORM_BLOCK_PROPERTIES,
  // Provided by VK_EXT_inline_uniform_block
    VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK_EXT = VK_STRUCTURE_TYPE_WRITE_DESCRIPTOR_SET_INLINE_UNIFORM_BLOCK,
  // Provided by VK_EXT_inline_uniform_block
    VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_DESCRIPTOR_POOL_INLINE_UNIFORM_BLOCK_CREATE_INFO,
  // Provided by VK_KHR_get_memory_requirements2
    VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2_KHR = VK_STRUCTURE_TYPE_BUFFER_MEMORY_REQUIREMENTS_INFO_2,
  // Provided by VK_KHR_get_memory_requirements2
    VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2_KHR = VK_STRUCTURE_TYPE_IMAGE_MEMORY_REQUIREMENTS_INFO_2,
  // Provided by VK_KHR_get_memory_requirements2
    VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2_KHR = VK_STRUCTURE_TYPE_IMAGE_SPARSE_MEMORY_REQUIREMENTS_INFO_2,
  // Provided by VK_KHR_get_memory_requirements2
    VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2_KHR = VK_STRUCTURE_TYPE_MEMORY_REQUIREMENTS_2,
  // Provided by VK_KHR_get_memory_requirements2
    VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2_KHR = VK_STRUCTURE_TYPE_SPARSE_IMAGE_MEMORY_REQUIREMENTS_2,
  // Provided by VK_KHR_image_format_list
    VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_IMAGE_FORMAT_LIST_CREATE_INFO,
  // Provided by VK_NV_framebuffer_mixed_samples with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
    VK_STRUCTURE_TYPE_ATTACHMENT_SAMPLE_COUNT_INFO_NV = VK_STRUCTURE_TYPE_ATTACHMENT_SAMPLE_COUNT_INFO_AMD,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO_KHR = VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_INFO,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO_KHR = VK_STRUCTURE_TYPE_BIND_IMAGE_PLANE_MEMORY_INFO,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO_KHR = VK_STRUCTURE_TYPE_IMAGE_PLANE_MEMORY_REQUIREMENTS_INFO,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SAMPLER_YCBCR_CONVERSION_FEATURES,
  // Provided by VK_KHR_sampler_ycbcr_conversion
    VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES_KHR = VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES,
  // Provided by VK_KHR_bind_memory2
    VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_INFO_KHR = VK_STRUCTURE_TYPE_BIND_BUFFER_MEMORY_INFO,
  // Provided by VK_KHR_bind_memory2
    VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO_KHR = VK_STRUCTURE_TYPE_BIND_IMAGE_MEMORY_INFO,
  // Provided by VK_EXT_descriptor_indexing
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_BINDING_FLAGS_CREATE_INFO,
  // Provided by VK_EXT_descriptor_indexing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES,
  // Provided by VK_EXT_descriptor_indexing
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_PROPERTIES,
  // Provided by VK_EXT_descriptor_indexing
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO_EXT = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_ALLOCATE_INFO,
  // Provided by VK_EXT_descriptor_indexing
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT_EXT = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_VARIABLE_DESCRIPTOR_COUNT_LAYOUT_SUPPORT,
  // Provided by VK_KHR_maintenance3
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_3_PROPERTIES,
  // Provided by VK_KHR_maintenance3
    VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT_KHR = VK_STRUCTURE_TYPE_DESCRIPTOR_SET_LAYOUT_SUPPORT,
  // Provided by VK_EXT_global_priority
    VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO,
  // Provided by VK_KHR_shader_subgroup_extended_types
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_EXTENDED_TYPES_FEATURES,
  // Provided by VK_KHR_8bit_storage
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_8BIT_STORAGE_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_8BIT_STORAGE_FEATURES,
  // Provided by VK_KHR_shader_atomic_int64
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_INT64_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_ATOMIC_INT64_FEATURES,
  // Provided by VK_EXT_calibrated_timestamps
    VK_STRUCTURE_TYPE_CALIBRATED_TIMESTAMP_INFO_EXT = VK_STRUCTURE_TYPE_CALIBRATED_TIMESTAMP_INFO_KHR,
  // Provided by VK_KHR_global_priority
    VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_QUEUE_GLOBAL_PRIORITY_CREATE_INFO,
  // Provided by VK_KHR_global_priority
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES,
  // Provided by VK_KHR_global_priority
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES_KHR = VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES,
  // Provided by VK_EXT_vertex_attribute_divisor
    VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO,
  // Provided by VK_EXT_vertex_attribute_divisor
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES,
  // Provided by VK_EXT_pipeline_creation_feedback
    VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_PIPELINE_CREATION_FEEDBACK_CREATE_INFO,
  // Provided by VK_KHR_driver_properties
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DRIVER_PROPERTIES,
  // Provided by VK_KHR_shader_float_controls
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FLOAT_CONTROLS_PROPERTIES,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_STENCIL_RESOLVE_PROPERTIES,
  // Provided by VK_KHR_depth_stencil_resolve
    VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE_KHR = VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_DEPTH_STENCIL_RESOLVE,
  // Provided by VK_NV_compute_shader_derivatives
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_FEATURES_NV = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COMPUTE_SHADER_DERIVATIVES_FEATURES_KHR,
  // Provided by VK_NV_fragment_shader_barycentric
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_FEATURES_NV = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_SHADER_BARYCENTRIC_FEATURES_KHR,
  // Provided by VK_KHR_timeline_semaphore
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_FEATURES,
  // Provided by VK_KHR_timeline_semaphore
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TIMELINE_SEMAPHORE_PROPERTIES,
  // Provided by VK_KHR_timeline_semaphore
    VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_SEMAPHORE_TYPE_CREATE_INFO,
  // Provided by VK_KHR_timeline_semaphore
    VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO_KHR = VK_STRUCTURE_TYPE_TIMELINE_SEMAPHORE_SUBMIT_INFO,
  // Provided by VK_KHR_timeline_semaphore
    VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO_KHR = VK_STRUCTURE_TYPE_SEMAPHORE_WAIT_INFO,
  // Provided by VK_KHR_timeline_semaphore
    VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO_KHR = VK_STRUCTURE_TYPE_SEMAPHORE_SIGNAL_INFO,
  // Provided by VK_INTEL_performance_query
  // VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO_INTEL is a legacy alias
    VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO_INTEL = VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_QUERY_CREATE_INFO_INTEL,
  // Provided by VK_KHR_vulkan_memory_model
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_MEMORY_MODEL_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_MEMORY_MODEL_FEATURES,
  // Provided by VK_KHR_shader_terminate_invocation
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TERMINATE_INVOCATION_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_TERMINATE_INVOCATION_FEATURES,
  // Provided by VK_EXT_scalar_block_layout
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCALAR_BLOCK_LAYOUT_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SCALAR_BLOCK_LAYOUT_FEATURES,
  // Provided by VK_EXT_subgroup_size_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_PROPERTIES,
  // Provided by VK_EXT_subgroup_size_control
    VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO,
  // Provided by VK_EXT_subgroup_size_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SUBGROUP_SIZE_CONTROL_FEATURES,
  // Provided by VK_KHR_dynamic_rendering_local_read
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_LOCAL_READ_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DYNAMIC_RENDERING_LOCAL_READ_FEATURES,
  // Provided by VK_KHR_dynamic_rendering_local_read
    VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO_KHR = VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_LOCATION_INFO,
  // Provided by VK_KHR_dynamic_rendering_local_read
    VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO_KHR = VK_STRUCTURE_TYPE_RENDERING_INPUT_ATTACHMENT_INDEX_INFO,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SEPARATE_DEPTH_STENCIL_LAYOUTS_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SEPARATE_DEPTH_STENCIL_LAYOUTS_FEATURES,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT_KHR = VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_STENCIL_LAYOUT,
  // Provided by VK_KHR_separate_depth_stencil_layouts
    VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT_KHR = VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_STENCIL_LAYOUT,
  // Provided by VK_EXT_buffer_device_address
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_ADDRESS_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_EXT,
  // Provided by VK_EXT_buffer_device_address
    VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO_EXT = VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO,
  // Provided by VK_EXT_tooling_info
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES,
  // Provided by VK_EXT_separate_stencil_usage
    VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_IMAGE_STENCIL_USAGE_CREATE_INFO,
  // Provided by VK_KHR_uniform_buffer_standard_layout
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFORM_BUFFER_STANDARD_LAYOUT_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_UNIFORM_BUFFER_STANDARD_LAYOUT_FEATURES,
  // Provided by VK_KHR_buffer_device_address
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_BUFFER_DEVICE_ADDRESS_FEATURES,
  // Provided by VK_KHR_buffer_device_address
    VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO_KHR = VK_STRUCTURE_TYPE_BUFFER_DEVICE_ADDRESS_INFO,
  // Provided by VK_KHR_buffer_device_address
    VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_BUFFER_OPAQUE_CAPTURE_ADDRESS_CREATE_INFO,
  // Provided by VK_KHR_buffer_device_address
    VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO_KHR = VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO,
  // Provided by VK_KHR_buffer_device_address
    VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO,
  // Provided by VK_EXT_line_rasterization
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES,
  // Provided by VK_EXT_line_rasterization
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO,
  // Provided by VK_EXT_line_rasterization
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES,
  // Provided by VK_EXT_host_query_reset
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_QUERY_RESET_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_QUERY_RESET_FEATURES,
  // Provided by VK_EXT_index_type_uint8
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_FEATURES,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_HOST_IMAGE_COPY_PROPERTIES,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_MEMORY_TO_IMAGE_COPY_EXT = VK_STRUCTURE_TYPE_MEMORY_TO_IMAGE_COPY,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_IMAGE_TO_MEMORY_COPY_EXT = VK_STRUCTURE_TYPE_IMAGE_TO_MEMORY_COPY,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_COPY_IMAGE_TO_MEMORY_INFO_EXT = VK_STRUCTURE_TYPE_COPY_IMAGE_TO_MEMORY_INFO,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INFO_EXT = VK_STRUCTURE_TYPE_COPY_MEMORY_TO_IMAGE_INFO,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO_EXT = VK_STRUCTURE_TYPE_HOST_IMAGE_LAYOUT_TRANSITION_INFO,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_COPY_IMAGE_TO_IMAGE_INFO_EXT = VK_STRUCTURE_TYPE_COPY_IMAGE_TO_IMAGE_INFO,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE_EXT = VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE,
  // Provided by VK_EXT_host_image_copy
    VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY_EXT = VK_STRUCTURE_TYPE_HOST_IMAGE_COPY_DEVICE_PERFORMANCE_QUERY,
  // Provided by VK_KHR_map_memory2
    VK_STRUCTURE_TYPE_MEMORY_MAP_INFO_KHR = VK_STRUCTURE_TYPE_MEMORY_MAP_INFO,
  // Provided by VK_KHR_map_memory2
    VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO_KHR = VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO,
  // Provided by VK_EXT_surface_maintenance1
    VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_EXT = VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_KHR,
  // Provided by VK_EXT_surface_maintenance1
    VK_STRUCTURE_TYPE_SURFACE_PRESENT_SCALING_CAPABILITIES_EXT = VK_STRUCTURE_TYPE_SURFACE_PRESENT_SCALING_CAPABILITIES_KHR,
  // Provided by VK_EXT_surface_maintenance1
    VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_COMPATIBILITY_EXT = VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_COMPATIBILITY_KHR,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SWAPCHAIN_MAINTENANCE_1_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SWAPCHAIN_MAINTENANCE_1_FEATURES_KHR,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_FENCE_INFO_EXT = VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_FENCE_INFO_KHR,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODES_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODES_CREATE_INFO_KHR,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODE_INFO_EXT = VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_MODE_INFO_KHR,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_SCALING_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_SWAPCHAIN_PRESENT_SCALING_CREATE_INFO_KHR,
  // Provided by VK_EXT_swapchain_maintenance1
    VK_STRUCTURE_TYPE_RELEASE_SWAPCHAIN_IMAGES_INFO_EXT = VK_STRUCTURE_TYPE_RELEASE_SWAPCHAIN_IMAGES_INFO_KHR,
  // Provided by VK_EXT_shader_demote_to_helper_invocation
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DEMOTE_TO_HELPER_INVOCATION_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_DEMOTE_TO_HELPER_INVOCATION_FEATURES,
  // Provided by VK_KHR_shader_integer_dot_product
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_FEATURES,
  // Provided by VK_KHR_shader_integer_dot_product
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_INTEGER_DOT_PRODUCT_PROPERTIES,
  // Provided by VK_EXT_texel_buffer_alignment
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TEXEL_BUFFER_ALIGNMENT_PROPERTIES,
  // Provided by VK_EXT_robustness2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_FEATURES_KHR,
  // Provided by VK_EXT_robustness2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_PROPERTIES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ROBUSTNESS_2_PROPERTIES_KHR,
  // Provided by VK_EXT_private_data
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRIVATE_DATA_FEATURES,
  // Provided by VK_EXT_private_data
    VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_DEVICE_PRIVATE_DATA_CREATE_INFO,
  // Provided by VK_EXT_private_data
    VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_CREATION_CACHE_CONTROL_FEATURES,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_MEMORY_BARRIER_2_KHR = VK_STRUCTURE_TYPE_MEMORY_BARRIER_2,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2_KHR = VK_STRUCTURE_TYPE_BUFFER_MEMORY_BARRIER_2,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2_KHR = VK_STRUCTURE_TYPE_IMAGE_MEMORY_BARRIER_2,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_DEPENDENCY_INFO_KHR = VK_STRUCTURE_TYPE_DEPENDENCY_INFO,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_SUBMIT_INFO_2_KHR = VK_STRUCTURE_TYPE_SUBMIT_INFO_2,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO_KHR = VK_STRUCTURE_TYPE_SEMAPHORE_SUBMIT_INFO,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO_KHR = VK_STRUCTURE_TYPE_COMMAND_BUFFER_SUBMIT_INFO,
  // Provided by VK_KHR_synchronization2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SYNCHRONIZATION_2_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SYNCHRONIZATION_2_FEATURES,
  // Provided by VK_KHR_zero_initialize_workgroup_memory
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_ZERO_INITIALIZE_WORKGROUP_MEMORY_FEATURES,
  // Provided by VK_EXT_image_robustness
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_IMAGE_ROBUSTNESS_FEATURES,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_COPY_BUFFER_INFO_2_KHR = VK_STRUCTURE_TYPE_COPY_BUFFER_INFO_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_COPY_IMAGE_INFO_2_KHR = VK_STRUCTURE_TYPE_COPY_IMAGE_INFO_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_COPY_BUFFER_TO_IMAGE_INFO_2_KHR = VK_STRUCTURE_TYPE_COPY_BUFFER_TO_IMAGE_INFO_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_COPY_IMAGE_TO_BUFFER_INFO_2_KHR = VK_STRUCTURE_TYPE_COPY_IMAGE_TO_BUFFER_INFO_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_BLIT_IMAGE_INFO_2_KHR = VK_STRUCTURE_TYPE_BLIT_IMAGE_INFO_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_RESOLVE_IMAGE_INFO_2_KHR = VK_STRUCTURE_TYPE_RESOLVE_IMAGE_INFO_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_BUFFER_COPY_2_KHR = VK_STRUCTURE_TYPE_BUFFER_COPY_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_IMAGE_COPY_2_KHR = VK_STRUCTURE_TYPE_IMAGE_COPY_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_IMAGE_BLIT_2_KHR = VK_STRUCTURE_TYPE_IMAGE_BLIT_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_BUFFER_IMAGE_COPY_2_KHR = VK_STRUCTURE_TYPE_BUFFER_IMAGE_COPY_2,
  // Provided by VK_KHR_copy_commands2
    VK_STRUCTURE_TYPE_IMAGE_RESOLVE_2_KHR = VK_STRUCTURE_TYPE_IMAGE_RESOLVE_2,
  // Provided by VK_EXT_image_compression_control
    VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2_EXT = VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2,
  // Provided by VK_EXT_image_compression_control
    VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2_EXT = VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2,
  // Provided by VK_ARM_rasterization_order_attachment_access
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_FEATURES_ARM = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RASTERIZATION_ORDER_ATTACHMENT_ACCESS_FEATURES_EXT,
  // Provided by VK_VALVE_mutable_descriptor_type
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MUTABLE_DESCRIPTOR_TYPE_FEATURES_VALVE = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MUTABLE_DESCRIPTOR_TYPE_FEATURES_EXT,
  // Provided by VK_VALVE_mutable_descriptor_type
    VK_STRUCTURE_TYPE_MUTABLE_DESCRIPTOR_TYPE_CREATE_INFO_VALVE = VK_STRUCTURE_TYPE_MUTABLE_DESCRIPTOR_TYPE_CREATE_INFO_EXT,
  // Provided by VK_KHR_format_feature_flags2
    VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3_KHR = VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_3,
  // Provided by VK_EXT_present_mode_fifo_latest_ready
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_MODE_FIFO_LATEST_READY_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PRESENT_MODE_FIFO_LATEST_READY_FEATURES_KHR,
  // Provided by VK_EXT_pipeline_properties
    VK_STRUCTURE_TYPE_PIPELINE_INFO_EXT = VK_STRUCTURE_TYPE_PIPELINE_INFO_KHR,
  // Provided by VK_EXT_global_priority_query
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_GLOBAL_PRIORITY_QUERY_FEATURES,
  // Provided by VK_EXT_global_priority_query
    VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES_EXT = VK_STRUCTURE_TYPE_QUEUE_FAMILY_GLOBAL_PRIORITY_PROPERTIES,
  // Provided by VK_KHR_maintenance4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_FEATURES,
  // Provided by VK_KHR_maintenance4
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_4_PROPERTIES,
  // Provided by VK_KHR_maintenance4
    VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS_KHR = VK_STRUCTURE_TYPE_DEVICE_BUFFER_MEMORY_REQUIREMENTS,
  // Provided by VK_KHR_maintenance4
    VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS_KHR = VK_STRUCTURE_TYPE_DEVICE_IMAGE_MEMORY_REQUIREMENTS,
  // Provided by VK_KHR_shader_subgroup_rotate
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_SUBGROUP_ROTATE_FEATURES,
  // Provided by VK_EXT_depth_clamp_zero_one
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_ZERO_ONE_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_ZERO_ONE_FEATURES_KHR,
  // Provided by VK_QCOM_fragment_density_map_offset
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_FEATURES_QCOM = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_FEATURES_EXT,
  // Provided by VK_QCOM_fragment_density_map_offset
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_PROPERTIES_QCOM = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FRAGMENT_DENSITY_MAP_OFFSET_PROPERTIES_EXT,
  // Provided by VK_QCOM_fragment_density_map_offset
    VK_STRUCTURE_TYPE_SUBPASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_QCOM = VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_EXT,
  // Provided by VK_NV_copy_memory_indirect
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_PROPERTIES_NV = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COPY_MEMORY_INDIRECT_PROPERTIES_KHR,
  // Provided by VK_NV_memory_decompression
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_FEATURES_NV = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_FEATURES_EXT,
  // Provided by VK_NV_memory_decompression
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_PROPERTIES_NV = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_DECOMPRESSION_PROPERTIES_EXT,
  // Provided by VK_EXT_pipeline_protected_access
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROTECTED_ACCESS_FEATURES_EXT = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_PROTECTED_ACCESS_FEATURES,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_FEATURES,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_5_PROPERTIES,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_RENDERING_AREA_INFO_KHR = VK_STRUCTURE_TYPE_RENDERING_AREA_INFO,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO_KHR = VK_STRUCTURE_TYPE_DEVICE_IMAGE_SUBRESOURCE_INFO,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2_KHR = VK_STRUCTURE_TYPE_SUBRESOURCE_LAYOUT_2,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2_KHR = VK_STRUCTURE_TYPE_IMAGE_SUBRESOURCE_2,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_PIPELINE_CREATE_FLAGS_2_CREATE_INFO,
  // Provided by VK_KHR_maintenance5
    VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_BUFFER_USAGE_FLAGS_2_CREATE_INFO,
  // Provided by VK_EXT_shader_object
    VK_STRUCTURE_TYPE_SHADER_REQUIRED_SUBGROUP_SIZE_CREATE_INFO_EXT = VK_STRUCTURE_TYPE_PIPELINE_SHADER_STAGE_REQUIRED_SUBGROUP_SIZE_CREATE_INFO,
  // Provided by VK_KHR_vertex_attribute_divisor
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES,
  // Provided by VK_KHR_vertex_attribute_divisor
    VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO,
  // Provided by VK_KHR_vertex_attribute_divisor
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES,
  // Provided by VK_KHR_shader_float_controls2
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT_CONTROLS_2_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_FLOAT_CONTROLS_2_FEATURES,
  // Provided by VK_KHR_index_type_uint8
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_INDEX_TYPE_UINT8_FEATURES,
  // Provided by VK_KHR_line_rasterization
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES,
  // Provided by VK_KHR_line_rasterization
    VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO_KHR = VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO,
  // Provided by VK_KHR_line_rasterization
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES,
  // Provided by VK_KHR_shader_expect_assume
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EXPECT_ASSUME_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_EXPECT_ASSUME_FEATURES,
  // Provided by VK_KHR_maintenance6
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_FEATURES,
  // Provided by VK_KHR_maintenance6
    VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES_KHR = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_6_PROPERTIES,
  // Provided by VK_KHR_maintenance6
    VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS_KHR = VK_STRUCTURE_TYPE_BIND_MEMORY_STATUS,
  // Provided by VK_KHR_maintenance6
    VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_SETS_INFO_KHR = VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_SETS_INFO,
  // Provided by VK_KHR_maintenance6
    VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO_KHR = VK_STRUCTURE_TYPE_PUSH_CONSTANTS_INFO,
  // Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
    VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO_KHR = VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_INFO,
  // Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
    VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO_KHR = VK_STRUCTURE_TYPE_PUSH_DESCRIPTOR_SET_WITH_TEMPLATE_INFO,
  // Provided by VK_EXT_fragment_density_map_offset
    VK_STRUCTURE_TYPE_RENDERING_END_INFO_EXT = VK_STRUCTURE_TYPE_RENDERING_END_INFO_KHR,
} VkStructureType;

A small number of APIs did not follow the [naming conventions](introduction.html#vulkan-styleguide) when initially defined.
For consistency, when we discover an API name that violates the naming
conventions, we rename it in the Specification, XML, and header files.
For backwards compatibility, the original (incorrect) name is retained as a
“typo alias”.
The alias is legacy and should not be used, but will be retained
indefinitely.

|  | `VK_STENCIL_FRONT_AND_BACK` is an example of a *typo alias*.
| --- | --- |
It was initially defined as part of [VkStencilFaceFlagBits](fragops.html#VkStencilFaceFlagBits).
Once the naming inconsistency was noticed, it was renamed to
[VK_STENCIL_FACE_FRONT_AND_BACK](fragops.html#VkStencilFaceFlagBits), and the old name was aliased to the
correct name. |
