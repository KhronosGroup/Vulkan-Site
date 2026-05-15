# Memory Allocation

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/memory.html

## Table of Contents

- [Host Memory](#memory-host)
- [Device Memory](#memory-device)
- [Device Memory Properties](#memory-device-properties)
- [Device_Memory_Properties](#memory-device-properties)
- [Device Memory Objects](#memory-device-objects)
- [Device_Memory_Objects](#memory-device-objects)
- [Device Memory Allocation](#_device_memory_allocation)
- [Device_Memory_Allocation](#_device_memory_allocation)
- [Win32 External Memory](#_win32_external_memory)
- [Win32_External_Memory](#_win32_external_memory)
- [File Descriptor External Memory](#_file_descriptor_external_memory)
- [File_Descriptor_External_Memory](#_file_descriptor_external_memory)
- [Host External Memory](#_host_external_memory)
- [Host_External_Memory](#_host_external_memory)
- [Android Hardware Buffer External Memory](#_android_hardware_buffer_external_memory)
- [Android_Hardware_Buffer_External_Memory](#_android_hardware_buffer_external_memory)
- [Remote Device External Memory](#_remote_device_external_memory)
- [Remote_Device_External_Memory](#_remote_device_external_memory)
- [Fuchsia External Memory](#fuchsia-external-memory)
- [Fuchsia_External_Memory](#fuchsia-external-memory)
- [Importing Fuchsia External Memory](#importing-fuchsia-external-memory)
- [Importing_Fuchsia_External_Memory](#importing-fuchsia-external-memory)
- [Exporting Fuchsia Device Memory](#exporting-fuchsia-device-memory)
- [Exporting_Fuchsia_Device_Memory](#exporting-fuchsia-device-memory)
- [Metal Objects](#metal-objects)
- [QNX Screen Buffer External Memory](#qnx-screen-buffer-external-memory)
- [QNX_Screen_Buffer_External_Memory](#qnx-screen-buffer-external-memory)
- [Metal External Memory](#_metal_external_memory)
- [Metal_External_Memory](#_metal_external_memory)
- [Device Group Memory Allocations](#_device_group_memory_allocations)
- [Device_Group_Memory_Allocations](#_device_group_memory_allocations)
- [Opaque Capture Address Allocation](#_opaque_capture_address_allocation)
- [Opaque_Capture_Address_Allocation](#_opaque_capture_address_allocation)
- [Freeing Device Memory](#_freeing_device_memory)
- [Freeing_Device_Memory](#_freeing_device_memory)
- [Host Access to Device Memory Objects](#memory-device-hostaccess)
- [Host_Access_to_Device_Memory_Objects](#memory-device-hostaccess)
- [Lazily Allocated Memory](#memory-device-lazy_allocation)
- [Lazily_Allocated_Memory](#memory-device-lazy_allocation)
- [Protected Memory](#memory-protected-memory)
- [Protected Memory Access Rules](#memory-protected-access-rules)
- [Protected_Memory_Access_Rules](#memory-protected-access-rules)
- [External Memory Handle Types](#memory-external-handle-types)
- [External_Memory_Handle_Types](#memory-external-handle-types)
- [Android Hardware Buffer](#memory-external-android-hardware-buffer)
- [Android_Hardware_Buffer](#memory-external-android-hardware-buffer)
- [Android Hardware Buffer Optimal Usages](#memory-external-android-hardware-buffer-optimal-usages)
- [Android_Hardware_Buffer_Optimal_Usages](#memory-external-android-hardware-buffer-optimal-usages)
- [Android Hardware Buffer External Formats](#memory-external-android-hardware-buffer-external-formats)
- [Android_Hardware_Buffer_External_Formats](#memory-external-android-hardware-buffer-external-formats)
- [Android Hardware Buffer Image Resources](#memory-external-android-hardware-buffer-image-resources)
- [Android_Hardware_Buffer_Image_Resources](#memory-external-android-hardware-buffer-image-resources)
- [Android Hardware Buffer Resources](#memory-external-android-hardware-buffer-buffer-resources)
- [Android_Hardware_Buffer_Resources](#memory-external-android-hardware-buffer-buffer-resources)
- [QNX Screen Buffer](#memory-external-qnx-screen-buffer)
- [QNX_Screen_Buffer](#memory-external-qnx-screen-buffer)
- [QNX Screen Buffer Validity](#memory-external-screen-buffer-validity)
- [QNX_Screen_Buffer_Validity](#memory-external-screen-buffer-validity)
- [QNX Screen Buffer External Formats](#memory-external-screen-buffer-external-formats)
- [QNX_Screen_Buffer_External_Formats](#memory-external-screen-buffer-external-formats)
- [QNX Screen Buffer Image Resources](#memory-external-qnx-screen-buffer-image-resources)
- [QNX_Screen_Buffer_Image_Resources](#memory-external-qnx-screen-buffer-image-resources)
- [Peer Memory Features](#memory-peer-memory-features)
- [Peer_Memory_Features](#memory-peer-memory-features)
- [Opaque Capture Address Query](#_opaque_capture_address_query)
- [Opaque_Capture_Address_Query](#_opaque_capture_address_query)

## Content

Vulkan memory is broken up into two categories, *host memory* and *device
memory*.

Host memory is memory needed by the Vulkan implementation for
non-device-visible storage.

|  | This memory **may** be used to store the implementation’s representation and
| --- | --- |
state of Vulkan objects. |

Vulkan provides applications the opportunity to perform host memory
allocations on behalf of the Vulkan implementation.
If this feature is not used, the implementation will perform its own memory
allocations.
Since most memory allocations are off the critical path, this is not meant
as a performance feature.
Rather, this **can** be useful for certain embedded systems, for debugging
purposes (e.g. putting a guard page after all host allocations), or for
memory allocation logging.

Allocators are provided by the application as a pointer to a
`VkAllocationCallbacks` structure:

// Provided by VK_VERSION_1_0
typedef struct VkAllocationCallbacks {
    void*                                   pUserData;
    PFN_vkAllocationFunction                pfnAllocation;
    PFN_vkReallocationFunction              pfnReallocation;
    PFN_vkFreeFunction                      pfnFree;
    PFN_vkInternalAllocationNotification    pfnInternalAllocation;
    PFN_vkInternalFreeNotification          pfnInternalFree;
} VkAllocationCallbacks;

* 
`pUserData` is NULL or an application-defined user data pointer to
be interpreted by the implementation of the callbacks.
When any of the callbacks in `VkAllocationCallbacks` are called, the
Vulkan implementation will pass this value as the first parameter to the
callback.
This value **can** vary each time an allocator is passed into a command,
even when the same object takes an allocator in multiple commands.

* 
`pfnAllocation` is a [PFN_vkAllocationFunction](#PFN_vkAllocationFunction) pointer to an
application-defined memory allocation function.

* 
`pfnReallocation` is a [PFN_vkReallocationFunction](#PFN_vkReallocationFunction) pointer to
an application-defined memory reallocation function.

* 
`pfnFree` is a [PFN_vkFreeFunction](#PFN_vkFreeFunction) pointer to an
application-defined memory free function.

* 
`pfnInternalAllocation` is a
[PFN_vkInternalAllocationNotification](#PFN_vkInternalAllocationNotification) pointer to an
application-defined function that is called by the implementation when
the implementation makes internal allocations.

* 
`pfnInternalFree` is a [PFN_vkInternalFreeNotification](#PFN_vkInternalFreeNotification) pointer
to an application-defined function that is called by the implementation
when the implementation frees internal allocations.

Valid Usage

* 
[](#VUID-VkAllocationCallbacks-pfnAllocation-00632) VUID-VkAllocationCallbacks-pfnAllocation-00632

`pfnAllocation` **must** be a valid pointer to a valid
application-defined [PFN_vkAllocationFunction](#PFN_vkAllocationFunction)

* 
[](#VUID-VkAllocationCallbacks-pfnReallocation-00633) VUID-VkAllocationCallbacks-pfnReallocation-00633

`pfnReallocation` **must** be a valid pointer to a valid
application-defined [PFN_vkReallocationFunction](#PFN_vkReallocationFunction)

* 
[](#VUID-VkAllocationCallbacks-pfnFree-00634) VUID-VkAllocationCallbacks-pfnFree-00634

`pfnFree` **must** be a valid pointer to a valid application-defined
[PFN_vkFreeFunction](#PFN_vkFreeFunction)

* 
[](#VUID-VkAllocationCallbacks-pfnInternalAllocation-00635) VUID-VkAllocationCallbacks-pfnInternalAllocation-00635

If either of `pfnInternalAllocation` or `pfnInternalFree` is not
`NULL`, both **must** be valid callbacks

The type of `pfnAllocation` is:

// Provided by VK_VERSION_1_0
typedef void* (*PFN_vkAllocationFunction)(
    void*                                       pUserData,
    size_t                                      size,
    size_t                                      alignment,
    VkSystemAllocationScope                     allocationScope);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](#VkAllocationCallbacks)::`pUserData` in the allocator specified
by the application.

* 
`size` is the size in bytes of the requested allocation.

* 
`alignment` is the requested alignment of the allocation in bytes
and **must** be a power of two.

* 
`allocationScope` is a [VkSystemAllocationScope](#VkSystemAllocationScope) value
specifying the allocation scope of the lifetime of the allocation, as
described [here](#memory-host-allocation-scope).

If `pfnAllocation` is unable to allocate the requested memory, it **must**
return `NULL`.
If the allocation was successful, it **must** return a valid pointer to memory
allocation containing at least `size` bytes, and with the pointer value
being a multiple of `alignment`.

|  | Correct Vulkan operation **cannot** be assumed if the application does not
| --- | --- |
follow these rules.

For example, `pfnAllocation` (or `pfnReallocation`) could cause
termination of running Vulkan instance(s) on a failed allocation for
debugging purposes, either directly or indirectly.
In these circumstances, it **cannot** be assumed that any part of any affected
[VkInstance](initialization.html#VkInstance) objects are going to operate correctly (even
[vkDestroyInstance](initialization.html#vkDestroyInstance)), and the application **must** ensure it cleans up
properly via other means (e.g. process termination). |

If `pfnAllocation` returns `NULL`, and if the implementation is unable
to continue correct processing of the current command without the requested
allocation, it **must** treat this as a runtime error, and generate
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult) at the appropriate time for the command in
which the condition was detected, as described in [Return Codes](fundamentals.html#fundamentals-errorcodes).

If the implementation is able to continue correct processing of the current
command without the requested allocation, then it **may** do so, and **must** not
generate [VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult) as a result of this failed
allocation.

The type of `pfnReallocation` is:

// Provided by VK_VERSION_1_0
typedef void* (*PFN_vkReallocationFunction)(
    void*                                       pUserData,
    void*                                       pOriginal,
    size_t                                      size,
    size_t                                      alignment,
    VkSystemAllocationScope                     allocationScope);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](#VkAllocationCallbacks)::`pUserData` in the allocator specified
by the application.

* 
`pOriginal` **must** be either `NULL` or a pointer previously returned
by `pfnReallocation` or `pfnAllocation` of a compatible
allocator.

* 
`size` is the size in bytes of the requested allocation.

* 
`alignment` is the requested alignment of the allocation in bytes
and **must** be a power of two.

* 
`allocationScope` is a [VkSystemAllocationScope](#VkSystemAllocationScope) value
specifying the allocation scope of the lifetime of the allocation, as
described [here](#memory-host-allocation-scope).

If the reallocation was successful, `pfnReallocation` **must** return an
allocation with enough space for `size` bytes, and the contents of the
original allocation from bytes zero to min(original size, new size) -
1 **must** be preserved in the returned allocation.
If `size` is larger than the old size, the contents of the additional
space are **undefined**.
If satisfying these requirements involves creating a new allocation, then
the old allocation **should** be freed.

If `pOriginal` is `NULL`, then `pfnReallocation` **must** behave
equivalently to a call to [PFN_vkAllocationFunction](#PFN_vkAllocationFunction) with the same
parameter values (without `pOriginal`).

If `size` is zero, then `pfnReallocation` **must** behave equivalently
to a call to [PFN_vkFreeFunction](#PFN_vkFreeFunction) with the same `pUserData`
parameter value, and `pMemory` equal to `pOriginal`.

If `pOriginal` is non-`NULL`, the implementation **must** ensure that
`alignment` is equal to the `alignment` used to originally allocate
`pOriginal`.

If this function fails and `pOriginal` is non-`NULL` the application
**must** not free the old allocation.

`pfnReallocation` **must** follow the same
[rules for return values as `PFN_vkAllocationFunction`](#vkAllocationFunction_return_rules).

The type of `pfnFree` is:

// Provided by VK_VERSION_1_0
typedef void (*PFN_vkFreeFunction)(
    void*                                       pUserData,
    void*                                       pMemory);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](#VkAllocationCallbacks)::`pUserData` in the allocator specified
by the application.

* 
`pMemory` is the allocation to be freed.

`pMemory` **may** be `NULL`, which the callback **must** handle safely.
If `pMemory` is non-`NULL`, it **must** be a pointer previously allocated
by `pfnAllocation` or `pfnReallocation`.
The application **should** free this memory.

The type of `pfnInternalAllocation` is:

// Provided by VK_VERSION_1_0
typedef void (*PFN_vkInternalAllocationNotification)(
    void*                                       pUserData,
    size_t                                      size,
    VkInternalAllocationType                    allocationType,
    VkSystemAllocationScope                     allocationScope);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](#VkAllocationCallbacks)::`pUserData` in the allocator specified
by the application.

* 
`size` is the requested size of an allocation.

* 
`allocationType` is a [VkInternalAllocationType](#VkInternalAllocationType) value
specifying the requested type of an allocation.

* 
`allocationScope` is a [VkSystemAllocationScope](#VkSystemAllocationScope) value
specifying the allocation scope of the lifetime of the allocation, as
described [here](#memory-host-allocation-scope).

This is a purely informational callback.

The type of `pfnInternalFree` is:

// Provided by VK_VERSION_1_0
typedef void (*PFN_vkInternalFreeNotification)(
    void*                                       pUserData,
    size_t                                      size,
    VkInternalAllocationType                    allocationType,
    VkSystemAllocationScope                     allocationScope);

* 
`pUserData` is the value specified for
[VkAllocationCallbacks](#VkAllocationCallbacks)::`pUserData` in the allocator specified
by the application.

* 
`size` is the requested size of an allocation.

* 
`allocationType` is a [VkInternalAllocationType](#VkInternalAllocationType) value
specifying the requested type of an allocation.

* 
`allocationScope` is a [VkSystemAllocationScope](#VkSystemAllocationScope) value
specifying the allocation scope of the lifetime of the allocation, as
described [here](#memory-host-allocation-scope).

Each allocation has an *allocation scope* defining its lifetime and which
object it is associated with.
Possible values passed to the `allocationScope` parameter of the
callback functions specified by [VkAllocationCallbacks](#VkAllocationCallbacks), indicating the
allocation scope, are:

// Provided by VK_VERSION_1_0
typedef enum VkSystemAllocationScope {
    VK_SYSTEM_ALLOCATION_SCOPE_COMMAND = 0,
    VK_SYSTEM_ALLOCATION_SCOPE_OBJECT = 1,
    VK_SYSTEM_ALLOCATION_SCOPE_CACHE = 2,
    VK_SYSTEM_ALLOCATION_SCOPE_DEVICE = 3,
    VK_SYSTEM_ALLOCATION_SCOPE_INSTANCE = 4,
} VkSystemAllocationScope;

* 
[VK_SYSTEM_ALLOCATION_SCOPE_COMMAND](#VkSystemAllocationScope) specifies that the allocation
is scoped to the duration of the Vulkan command.

* 
[VK_SYSTEM_ALLOCATION_SCOPE_OBJECT](#VkSystemAllocationScope) specifies that the allocation is
scoped to the lifetime of the Vulkan object that is being created or
used.

* 
[VK_SYSTEM_ALLOCATION_SCOPE_CACHE](#VkSystemAllocationScope) specifies that the allocation is
scoped to the lifetime of a `VkPipelineCache`
or `VkValidationCacheEXT`
object.

* 
[VK_SYSTEM_ALLOCATION_SCOPE_DEVICE](#VkSystemAllocationScope) specifies that the allocation is
scoped to the lifetime of the Vulkan device.

* 
[VK_SYSTEM_ALLOCATION_SCOPE_INSTANCE](#VkSystemAllocationScope) specifies that the allocation
is scoped to the lifetime of the Vulkan instance.

Most Vulkan commands operate on a single object, or there is a sole object
that is being created or manipulated.
When an allocation uses an allocation scope of
[VK_SYSTEM_ALLOCATION_SCOPE_OBJECT](#VkSystemAllocationScope) or
[VK_SYSTEM_ALLOCATION_SCOPE_CACHE](#VkSystemAllocationScope), the allocation is scoped to the
object being created or manipulated.

When an implementation requires host memory, it will make callbacks to the
application using the most specific allocator and allocation scope
available:

* 
If an allocation is scoped to the duration of a command, the allocator
will use the [VK_SYSTEM_ALLOCATION_SCOPE_COMMAND](#VkSystemAllocationScope) allocation scope.
The most specific allocator available is used: if the object being
created or manipulated has an allocator, that object’s allocator will be
used, else if the parent `VkDevice` has an allocator it will be
used, else if the parent `VkInstance` has an allocator it will be
used.
Else,

* 
If an allocation is associated with a
`VkValidationCacheEXT` or
`VkPipelineCache` object, the allocator will use the
[VK_SYSTEM_ALLOCATION_SCOPE_CACHE](#VkSystemAllocationScope) allocation scope.
The most specific allocator available is used (cache, else device, else
instance).
Else,

* 
If an allocation is scoped to the lifetime of an object, that object is
being created or manipulated by the command, and that object’s type is
not `VkDevice` or `VkInstance`, the allocator will use an
allocation scope of [VK_SYSTEM_ALLOCATION_SCOPE_OBJECT](#VkSystemAllocationScope).
The most specific allocator available is used (object, else device, else
instance).
Else,

* 
If an allocation is scoped to the lifetime of a device, the allocator
will use an allocation scope of [VK_SYSTEM_ALLOCATION_SCOPE_DEVICE](#VkSystemAllocationScope).
The most specific allocator available is used (device, else instance).
Else,

* 
If the allocation is scoped to the lifetime of an instance and the
instance has an allocator, its allocator will be used with an allocation
scope of [VK_SYSTEM_ALLOCATION_SCOPE_INSTANCE](#VkSystemAllocationScope).

* 
Otherwise an implementation will allocate memory through an alternative
mechanism that is unspecified.

Objects that are allocated from pools do not specify their own allocator.
When an implementation requires host memory for such an object, that memory
is sourced from the object’s parent pool’s allocator.

The application is not expected to handle allocating memory that is intended
for execution by the host due to the complexities of differing security
implementations across multiple platforms.
The implementation will allocate such memory internally and invoke an
application provided informational callback when these *internal
allocations* are allocated and freed.
Upon allocation of executable memory, `pfnInternalAllocation` will be
called.
Upon freeing executable memory, `pfnInternalFree` will be called.
An implementation will only call an informational callback for executable
memory allocations and frees.

The `allocationType` parameter to the `pfnInternalAllocation` and
`pfnInternalFree` functions **may** be one of the following values:

// Provided by VK_VERSION_1_0
typedef enum VkInternalAllocationType {
    VK_INTERNAL_ALLOCATION_TYPE_EXECUTABLE = 0,
} VkInternalAllocationType;

* 
[VK_INTERNAL_ALLOCATION_TYPE_EXECUTABLE](#VkInternalAllocationType) specifies that the
allocation is intended for execution by the host.

An implementation **must** only make calls into an application-provided
allocator during the execution of an API command.
An implementation **must** only make calls into an application-provided
allocator from the same thread that called the provoking API command.
The implementation **should** not synchronize calls to any of the callbacks.
If synchronization is needed, the callbacks **must** provide it themselves.
The informational callbacks are subject to the same restrictions as the
allocation callbacks.

If an implementation intends to make calls through a
`VkAllocationCallbacks` structure between the time a `vkCreate*`
command returns and the time a corresponding `vkDestroy*` command
begins, that implementation **must** save a copy of the allocator before the
`vkCreate*` command returns.
The callback functions and any data structures they rely upon **must** remain
valid for the lifetime of the object they are associated with.

If an allocator is provided to a `vkCreate*` command, a *compatible*
allocator **must** be provided to the corresponding `vkDestroy*` command.
Two `VkAllocationCallbacks` structures are compatible if memory
allocated with `pfnAllocation` or `pfnReallocation` in each **can** be
freed with `pfnReallocation` or `pfnFree` in the other.
An allocator **must** not be provided to a `vkDestroy*` command if an
allocator was not provided to the corresponding `vkCreate*` command.

If a non-`NULL` allocator is used, the `pfnAllocation`,
`pfnReallocation` and `pfnFree` members **must** be non-`NULL` and
point to valid implementations of the callbacks.
An application **can** choose to not provide informational callbacks by setting
both `pfnInternalAllocation` and `pfnInternalFree` to `NULL`.
`pfnInternalAllocation` and `pfnInternalFree` **must** either both be
`NULL` or both be non-`NULL`.

If `pfnAllocation` or `pfnReallocation` fail, the implementation
**may** fail object creation and/or generate a
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult) error, as appropriate.

Allocation callbacks **must** not call any Vulkan commands.

The following sets of rules define when an implementation is permitted to
call the allocator callbacks.

`pfnAllocation` or `pfnReallocation` **may** be called in the following
situations:

* 
Allocations scoped to a `VkDevice` or `VkInstance` **may** be
allocated from any API command.

* 
Allocations scoped to a command **may** be allocated from any API command.

* 
Allocations scoped to a `VkPipelineCache` **may** only be allocated
from:

`vkCreatePipelineCache`

* 
`vkMergePipelineCaches` for `dstCache`

* 
`vkCreateGraphicsPipelines` for `pipelineCache`

* 
`vkCreateComputePipelines` for `pipelineCache`

Allocations scoped to a `VkValidationCacheEXT` **may** only be
allocated from:

* 
`vkCreateValidationCacheEXT`

* 
`vkMergeValidationCachesEXT` for `dstCache`

* 
`vkCreateShaderModule` for `validationCache` in
[VkShaderModuleValidationCacheCreateInfoEXT](shaders.html#VkShaderModuleValidationCacheCreateInfoEXT)

Allocations scoped to a `VkDescriptorPool` **may** only be allocated
from:

* 
any command that takes the pool as a direct argument

* 
`vkAllocateDescriptorSets` for the `descriptorPool` member of
its `pAllocateInfo` parameter

* 
`vkCreateDescriptorPool`

Allocations scoped to a `VkCommandPool` **may** only be allocated from:

* 
any command that takes the pool as a direct argument

* 
`vkCreateCommandPool`

* 
`vkAllocateCommandBuffers` for the `commandPool` member of its
`pAllocateInfo` parameter

* 
any `vkCmd*` command whose `commandBuffer` was allocated from
that `VkCommandPool`

Allocations scoped to any other object **may** only be allocated in that
object’s `vkCreate*` command.

`pfnFree`, or `pfnReallocation` with zero `size`, **may** be called
in the following situations:

* 
Allocations scoped to a `VkDevice` or `VkInstance` **may** be freed
from any API command.

* 
Allocations scoped to a command **must** be freed by any API command which
allocates such memory.

* 
Allocations scoped to a `VkPipelineCache` **may** be freed from
`vkDestroyPipelineCache`.

* 
Allocations scoped to a `VkValidationCacheEXT` **may** be freed from
`vkDestroyValidationCacheEXT`.

* 
Allocations scoped to a `VkDescriptorPool` **may** be freed from

any command that takes the pool as a direct argument

Allocations scoped to a `VkCommandPool` **may** be freed from:

* 
any command that takes the pool as a direct argument

* 
`vkResetCommandBuffer` whose `commandBuffer` was allocated from
that `VkCommandPool`

Allocations scoped to any other object **may** be freed in that object’s
`vkDestroy*` command.

Any command that allocates host memory **may** also free host memory of the
same scope.

*Device memory* is memory that is visible to the device — for example the
contents of the image or buffer objects, which **can** be natively used by the
device.

Memory properties of a physical device describe the memory heaps and memory
types available.

To query memory properties, call:

|  | This functionality is superseded by [vkGetPhysicalDeviceMemoryProperties2](#vkGetPhysicalDeviceMemoryProperties2). See [Legacy Functionality](../appendices/legacy.html#legacy-gpdp2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkGetPhysicalDeviceMemoryProperties(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceMemoryProperties*           pMemoryProperties);

* 
`physicalDevice` is the handle to the device to query.

* 
`pMemoryProperties` is a pointer to a
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties) structure in which the properties
are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties-physicalDevice-parameter) VUID-vkGetPhysicalDeviceMemoryProperties-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties-pMemoryProperties-parameter) VUID-vkGetPhysicalDeviceMemoryProperties-pMemoryProperties-parameter

 `pMemoryProperties` **must** be a valid pointer to a [VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties) structure

The `VkPhysicalDeviceMemoryProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPhysicalDeviceMemoryProperties {
    uint32_t        memoryTypeCount;
    VkMemoryType    memoryTypes[VK_MAX_MEMORY_TYPES];
    uint32_t        memoryHeapCount;
    VkMemoryHeap    memoryHeaps[VK_MAX_MEMORY_HEAPS];
} VkPhysicalDeviceMemoryProperties;

* 
`memoryTypeCount` is the number of valid elements in the
`memoryTypes` array.

* 
`memoryTypes` is an array of [VK_MAX_MEMORY_TYPES](#VK_MAX_MEMORY_TYPES)
[VkMemoryType](#VkMemoryType) structures describing the *memory types* that **can** be
used to access memory allocated from the heaps specified by
`memoryHeaps`.

* 
`memoryHeapCount` is the number of valid elements in the
`memoryHeaps` array.

* 
`memoryHeaps` is an array of [VK_MAX_MEMORY_HEAPS](#VK_MAX_MEMORY_HEAPS)
[VkMemoryHeap](#VkMemoryHeap) structures describing the *memory heaps* from which
memory **can** be allocated.

The `VkPhysicalDeviceMemoryProperties` structure describes a number of
*memory heaps* as well as a number of *memory types* that **can** be used to
access memory allocated in those heaps.
Each heap describes a memory resource of a particular size, and each memory
type describes a set of memory properties (e.g. host cached vs. uncached)
that **can** be used with a given memory heap.
Allocations using a particular memory type will consume resources from the
heap indicated by that memory type’s heap index.
More than one memory type **may** share each heap, and the heaps and memory
types provide a mechanism to advertise an accurate size of the physical
memory resources while allowing the memory to be used with a variety of
different properties.

The number of memory heaps is given by `memoryHeapCount` and is less
than or equal to [VK_MAX_MEMORY_HEAPS](#VK_MAX_MEMORY_HEAPS).
Each heap is described by an element of the `memoryHeaps` array as a
[VkMemoryHeap](#VkMemoryHeap) structure.
The number of memory types available across all memory heaps is given by
`memoryTypeCount` and is less than or equal to
[VK_MAX_MEMORY_TYPES](#VK_MAX_MEMORY_TYPES).
Each memory type is described by an element of the `memoryTypes` array
as a [VkMemoryType](#VkMemoryType) structure.

At least one heap **must** include [VK_MEMORY_HEAP_DEVICE_LOCAL_BIT](#VkMemoryHeapFlagBits) in
[VkMemoryHeap](#VkMemoryHeap)::`flags`.
If there are multiple heaps that all have similar performance
characteristics, they **may** all include
[VK_MEMORY_HEAP_DEVICE_LOCAL_BIT](#VkMemoryHeapFlagBits).
In a unified memory architecture (UMA) system there is often only a single
memory heap which is considered to be equally “local” to the host and to
the device, and such an implementation **must** advertise the heap as
device-local.

Memory contents within a tile memory heap, denoted by
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](#VkMemoryHeapFlagBits), are only visible across the
command buffers executed in a single command buffer submission batch within
a [vkQueueSubmit](cmdbuffers.html#vkQueueSubmit) or [vkQueueSubmit2](cmdbuffers.html#vkQueueSubmit2) call.
If the
[VkPhysicalDeviceTileMemoryHeapPropertiesQCOM](limits.html#VkPhysicalDeviceTileMemoryHeapPropertiesQCOM)::`queueSubmitBoundary`
property is set, the visibility is extended across all batches in the submit
call.
Memory contents are discarded and made **undefined** after the respective
submission batch or submit call.
Tile memory **may** have different performance characteristics than non tile
memory.
Tile memory **can** be used simultaneously by command buffers in other queues
without invalidating each others contents.
Collectively, these rules define the *tile memory scope*.

|  | Tile memory heaps work differently than most heaps as it is allowing
| --- | --- |
addressing on device cache memory.
Therefore, the heap’s address space is aliased across the different queues,
with each queue retaining its individual copy of the heap.
The implementation takes care of any required saving and restoring of the
tile memory contents.

Effectively, this means that the same address in the heap in different
queues have simultaneously different defined contents and the contents has a
lifespan scoped to the submit or batch for that specific queues. |

Each memory type returned by [vkGetPhysicalDeviceMemoryProperties](#vkGetPhysicalDeviceMemoryProperties) **must**
have its `propertyFlags` set to one of the following values:

* 
0

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_PROTECTED_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_PROTECTED_BIT](#VkMemoryPropertyFlagBits) |
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) |

[VK_MEMORY_PROPERTY_RDMA_CAPABLE_BIT_NV](#VkMemoryPropertyFlagBits)

There **must** be at least one memory type with both the
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) and
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) bits set in its
`propertyFlags`.
There **must** be at least one memory type with the
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) bit set in its
`propertyFlags`.
If the [`deviceCoherentMemory`](features.html#features-deviceCoherentMemory) feature
is enabled, there **must** be at least one memory type with the
[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) bit set in its
`propertyFlags`.

For each pair of elements **X** and **Y** returned in `memoryTypes`, **X**
**must** be placed at a lower index position than **Y** if:

* 
the set of bit flags returned in the `propertyFlags` member of **X**
is a strict subset of the set of bit flags returned in the
`propertyFlags` member of **Y**; or

* 
the `propertyFlags` members of **X** and **Y** are equal, and **X**
belongs to a memory heap with greater performance (as determined in an
implementation-specific manner)
; or

* 
the `propertyFlags` members of **Y** includes
[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) or
[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](#VkMemoryPropertyFlagBits) and **X** does not

|  | There is no ordering requirement between **X** and **Y** elements for the case
| --- | --- |
their `propertyFlags` members are not in a subset relation.
That potentially allows more than one possible way to order the same set of
memory types.
Notice that the [list of all allowed memory property flag combinations](#memory-device-bitmask-list) is written in a valid order.
But if instead [VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) was before
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) \|
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits), the list would still be in a
valid order.

There may be a performance penalty for using device coherent or uncached
device memory types, and using these accidentally is undesirable.
In order to avoid this, memory types with these properties always appear at
the end of the list; but are subject to the same rules otherwise. |

This ordering requirement enables applications to use a simple search loop
to select the desired memory type along the lines of:

// Find a memory in `memoryTypeBitsRequirement` that includes all of `requiredProperties`
int32_t findProperties(const VkPhysicalDeviceMemoryProperties* pMemoryProperties,
                       uint32_t memoryTypeBitsRequirement,
                       VkMemoryPropertyFlags requiredProperties) {
    const uint32_t memoryCount = pMemoryProperties->memoryTypeCount;
    for (uint32_t memoryIndex = 0; memoryIndex memoryTypes[memoryIndex].propertyFlags;
        const bool hasRequiredProperties =
            (properties & requiredProperties) == requiredProperties;

        if (isRequiredMemoryType && hasRequiredProperties)
            return static_cast(memoryIndex);
    }

    // failed to find memory type
    return -1;
}

// Try to find an optimal memory type, or if it does not exist try fallback memory type
// `device` is the VkDevice
// `image` is the VkImage that requires memory to be bound
// `memoryProperties` properties as returned by vkGetPhysicalDeviceMemoryProperties
// `requiredProperties` are the property flags that must be present
// `optimalProperties` are the property flags that are preferred by the application
VkMemoryRequirements memoryRequirements;
vkGetImageMemoryRequirements(device, image, &memoryRequirements);
int32_t memoryType =
    findProperties(&memoryProperties, memoryRequirements.memoryTypeBits, optimalProperties);
if (memoryType == -1) // not found; try fallback properties
    memoryType =
        findProperties(&memoryProperties, memoryRequirements.memoryTypeBits, requiredProperties);

[VK_MAX_MEMORY_TYPES](#VK_MAX_MEMORY_TYPES) is the length of an array of [VkMemoryType](#VkMemoryType)
structures describing memory types, as returned in
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)::`memoryTypes`.

#define VK_MAX_MEMORY_TYPES               32U

[VK_MAX_MEMORY_HEAPS](#VK_MAX_MEMORY_HEAPS) is the length of an array of [VkMemoryHeap](#VkMemoryHeap)
structures describing memory heaps, as returned in
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)::`memoryHeaps`.

#define VK_MAX_MEMORY_HEAPS               16U

To query memory properties, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceMemoryProperties2(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceMemoryProperties2*          pMemoryProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceMemoryProperties2
void vkGetPhysicalDeviceMemoryProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkPhysicalDeviceMemoryProperties2*          pMemoryProperties);

* 
`physicalDevice` is the handle to the device to query.

* 
`pMemoryProperties` is a pointer to a
[VkPhysicalDeviceMemoryProperties2](#VkPhysicalDeviceMemoryProperties2) structure in which the
properties are returned.

`vkGetPhysicalDeviceMemoryProperties2` behaves similarly to
[vkGetPhysicalDeviceMemoryProperties](#vkGetPhysicalDeviceMemoryProperties), with the ability to return
extended information in a `pNext` chain of output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceMemoryProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceMemoryProperties2-pMemoryProperties-parameter) VUID-vkGetPhysicalDeviceMemoryProperties2-pMemoryProperties-parameter

 `pMemoryProperties` **must** be a valid pointer to a [VkPhysicalDeviceMemoryProperties2](#VkPhysicalDeviceMemoryProperties2) structure

The `VkPhysicalDeviceMemoryProperties2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceMemoryProperties2 {
    VkStructureType                     sType;
    void*                               pNext;
    VkPhysicalDeviceMemoryProperties    memoryProperties;
} VkPhysicalDeviceMemoryProperties2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceMemoryProperties2
typedef VkPhysicalDeviceMemoryProperties2 VkPhysicalDeviceMemoryProperties2KHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryProperties` is a [VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)
structure which is populated with the same values as in
[vkGetPhysicalDeviceMemoryProperties](#vkGetPhysicalDeviceMemoryProperties).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryProperties2-sType-sType) VUID-VkPhysicalDeviceMemoryProperties2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_PROPERTIES_2](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPhysicalDeviceMemoryProperties2-pNext-pNext) VUID-VkPhysicalDeviceMemoryProperties2-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPhysicalDeviceMemoryBudgetPropertiesEXT](#VkPhysicalDeviceMemoryBudgetPropertiesEXT)

* 
[](#VUID-VkPhysicalDeviceMemoryProperties2-sType-unique) VUID-VkPhysicalDeviceMemoryProperties2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

The `VkMemoryHeap` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryHeap {
    VkDeviceSize         size;
    VkMemoryHeapFlags    flags;
} VkMemoryHeap;

* 
`size` is the total memory size in bytes in the heap.

* 
`flags` is a bitmask of [VkMemoryHeapFlagBits](#VkMemoryHeapFlagBits) specifying
attribute flags for the heap.

Bits which **may** be set in [VkMemoryHeap](#VkMemoryHeap)::`flags`, indicating
attribute flags for the heap, are:

// Provided by VK_VERSION_1_0
typedef enum VkMemoryHeapFlagBits {
    VK_MEMORY_HEAP_DEVICE_LOCAL_BIT = 0x00000001,
  // Provided by VK_VERSION_1_1
    VK_MEMORY_HEAP_MULTI_INSTANCE_BIT = 0x00000002,
  // Provided by VK_QCOM_tile_memory_heap
    VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM = 0x00000008,
  // Provided by VK_KHR_device_group_creation
    VK_MEMORY_HEAP_MULTI_INSTANCE_BIT_KHR = VK_MEMORY_HEAP_MULTI_INSTANCE_BIT,
} VkMemoryHeapFlagBits;

* 
[VK_MEMORY_HEAP_DEVICE_LOCAL_BIT](#VkMemoryHeapFlagBits) specifies that the heap
corresponds to device-local memory.
Device-local memory **may** have different performance characteristics than
host-local memory, and **may** support different memory property flags.

* 
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](#VkMemoryHeapFlagBits) specifies that in a logical
device representing more than one physical device, there is a
per-physical device instance of the heap memory.
By default, an allocation from such a heap will be replicated to each
physical device’s instance of the heap.

* 
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](#VkMemoryHeapFlagBits) bit specifies that the heap
corresponds to tile memory.

// Provided by VK_VERSION_1_0
typedef VkFlags VkMemoryHeapFlags;

`VkMemoryHeapFlags` is a bitmask type for setting a mask of zero or more
[VkMemoryHeapFlagBits](#VkMemoryHeapFlagBits).

The `VkMemoryType` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryType {
    VkMemoryPropertyFlags    propertyFlags;
    uint32_t                 heapIndex;
} VkMemoryType;

* 
`heapIndex` describes which memory heap this memory type corresponds
to, and **must** be less than `memoryHeapCount` from the
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties) structure.

* 
`propertyFlags` is a bitmask of [VkMemoryPropertyFlagBits](#VkMemoryPropertyFlagBits) of
properties for this memory type.

Bits which **may** be set in [VkMemoryType](#VkMemoryType)::`propertyFlags`,
indicating properties of a memory type, are:

// Provided by VK_VERSION_1_0
typedef enum VkMemoryPropertyFlagBits {
    VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT = 0x00000001,
    VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT = 0x00000002,
    VK_MEMORY_PROPERTY_HOST_COHERENT_BIT = 0x00000004,
    VK_MEMORY_PROPERTY_HOST_CACHED_BIT = 0x00000008,
    VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT = 0x00000010,
  // Provided by VK_VERSION_1_1
    VK_MEMORY_PROPERTY_PROTECTED_BIT = 0x00000020,
  // Provided by VK_AMD_device_coherent_memory
    VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD = 0x00000040,
  // Provided by VK_AMD_device_coherent_memory
    VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD = 0x00000080,
  // Provided by VK_NV_external_memory_rdma
    VK_MEMORY_PROPERTY_RDMA_CAPABLE_BIT_NV = 0x00000100,
} VkMemoryPropertyFlagBits;

* 
[VK_MEMORY_PROPERTY_DEVICE_LOCAL_BIT](#VkMemoryPropertyFlagBits) bit specifies that memory
allocated with this type is the most efficient for device access.
This property will be set if and only if the memory type belongs to a
heap with the [VK_MEMORY_HEAP_DEVICE_LOCAL_BIT](#VkMemoryHeapFlagBits) set.

* 
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) bit specifies that memory
allocated with this type **can** be mapped for host access using
[vkMapMemory](#vkMapMemory).

* 
 [VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) bit
specifies that the host cache management commands
[vkFlushMappedMemoryRanges](#vkFlushMappedMemoryRanges) and [vkInvalidateMappedMemoryRanges](#vkInvalidateMappedMemoryRanges)
are not needed to manage
[availability and    visibility](synchronization.html#synchronization-dependencies-available-and-visible) on the host.

* 
[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) bit specifies that memory
allocated with this type is cached on the host.
Host memory accesses to uncached memory are slower than to cached
memory, however uncached memory is always host coherent.

* 
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](#VkMemoryPropertyFlagBits) bit specifies that the
memory type only allows device access to the memory.
Memory types **must** not have both
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](#VkMemoryPropertyFlagBits) and
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) set.
Additionally, the object’s backing memory **may** be provided by the
implementation lazily as specified in [    Lazily Allocated Memory](#memory-device-lazy_allocation).

* 
[VK_MEMORY_PROPERTY_PROTECTED_BIT](#VkMemoryPropertyFlagBits) bit specifies that the memory
type only allows device access to the memory, and allows protected queue
operations to access the memory.
Memory types **must** not have [VK_MEMORY_PROPERTY_PROTECTED_BIT](#VkMemoryPropertyFlagBits) set
and any of [VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) set, or
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) set, or
[VK_MEMORY_PROPERTY_HOST_CACHED_BIT](#VkMemoryPropertyFlagBits) set.

* 
[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits) bit specifies that
device accesses to allocations of this memory type are automatically
made [available and    visible](synchronization.html#synchronization-dependencies-available-and-visible) on the device.
If paired with [VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits),
[memory domain    operations](synchronization.html#synchronization-dependencies-available-and-visible) are also performed automatically between host and device.

* 
[VK_MEMORY_PROPERTY_DEVICE_UNCACHED_BIT_AMD](#VkMemoryPropertyFlagBits) bit specifies that
memory allocated with this type is not cached on the device.
Uncached device memory is always device coherent.

* 
[VK_MEMORY_PROPERTY_RDMA_CAPABLE_BIT_NV](#VkMemoryPropertyFlagBits) bit specifies that external
devices can access this memory directly.

For any memory allocated with both the
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) and the
[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits), host or device accesses
also perform automatic memory domain transfer operations, such that writes
are always automatically available and visible to both host and device
memory domains.

|  | Device coherence is a useful property for certain debugging use cases (e.g.
| --- | --- |
crash analysis, where performing separate coherence actions could mean
values are not reported correctly).
However, device coherent accesses may be slower than equivalent accesses
without device coherence, particularly if they are also device uncached.
For device uncached memory in particular, repeated accesses to the same or
neighboring memory locations over a short time period (e.g. within a frame)
may be slower than it would be for the equivalent cached memory type.
As such, it is generally inadvisable to use device coherent or device
uncached memory except when really needed. |

// Provided by VK_VERSION_1_0
typedef VkFlags VkMemoryPropertyFlags;

`VkMemoryPropertyFlags` is a bitmask type for setting a mask of zero or
more [VkMemoryPropertyFlagBits](#VkMemoryPropertyFlagBits).

If the `VkPhysicalDeviceMemoryBudgetPropertiesEXT` structure is included
in the `pNext` chain of [VkPhysicalDeviceMemoryProperties2](#VkPhysicalDeviceMemoryProperties2), it is
filled with the current memory budgets and usages.

The `VkPhysicalDeviceMemoryBudgetPropertiesEXT` structure is defined as:

// Provided by VK_EXT_memory_budget
typedef struct VkPhysicalDeviceMemoryBudgetPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       heapBudget[VK_MAX_MEMORY_HEAPS];
    VkDeviceSize       heapUsage[VK_MAX_MEMORY_HEAPS];
} VkPhysicalDeviceMemoryBudgetPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`heapBudget` is an array of [VK_MAX_MEMORY_HEAPS](#VK_MAX_MEMORY_HEAPS)
`VkDeviceSize` values in which memory budgets are returned, with
one element for each memory heap.
A heap’s budget is a rough estimate of how much memory the process **can**
allocate from that heap before allocations **may** fail or cause
performance degradation.
The budget includes any currently allocated device memory.

* 
`heapUsage` is an array of [VK_MAX_MEMORY_HEAPS](#VK_MAX_MEMORY_HEAPS)
`VkDeviceSize` values in which memory usages are returned, with
one element for each memory heap.
A heap’s usage is an estimate of how much memory the process is
currently using in that heap.

The values returned in this structure are not invariant.
The `heapBudget` and `heapUsage` values **must** be zero for array
elements greater than or equal to
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)::`memoryHeapCount`.
The `heapBudget` value **must** be non-zero for array elements less than
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)::`memoryHeapCount`.
The `heapBudget` value **must** be less than or equal to
[VkMemoryHeap](#VkMemoryHeap)::`size` for each heap.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceMemoryBudgetPropertiesEXT-sType-sType) VUID-VkPhysicalDeviceMemoryBudgetPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MEMORY_BUDGET_PROPERTIES_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceMemoryProperties2](#VkPhysicalDeviceMemoryProperties2)

A Vulkan device operates on data in device memory via memory objects that
are represented in the API by a `VkDeviceMemory` handle:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkDeviceMemory)

To allocate memory objects, call:

// Provided by VK_VERSION_1_0
VkResult vkAllocateMemory(
    VkDevice                                    device,
    const VkMemoryAllocateInfo*                 pAllocateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkDeviceMemory*                             pMemory);

* 
`device` is the logical device that owns the memory.

* 
`pAllocateInfo` is a pointer to a [VkMemoryAllocateInfo](#VkMemoryAllocateInfo)
structure describing parameters of the allocation.
A successfully returned allocation **must** use the requested parameters — no substitution is permitted by the implementation.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](#memory-allocation) chapter.

* 
`pMemory` is a pointer to a [VkDeviceMemory](#VkDeviceMemory) handle in which
information about the allocated memory is returned.

Allocations returned by `vkAllocateMemory` are guaranteed to meet any
alignment requirement of the implementation.
For example, if an implementation requires 128 byte alignment for images and
64 byte alignment for buffers, the device memory returned through this
mechanism would be 128-byte aligned.
This ensures that applications **can** correctly suballocate objects of
different types (with potentially different alignment requirements) in the
same memory object.

When memory is allocated, its contents are **undefined** with the following
constraint:

* 
The contents of unprotected memory **must** not be a function of the
contents of data protected memory objects, even if those memory objects
were previously freed.

|  | The contents of memory allocated by one application **should** not be a
| --- | --- |
function of data from protected memory objects of another application, even
if those memory objects were previously freed. |

The maximum number of valid memory allocations that **can** exist
simultaneously within a [VkDevice](devsandqueues.html#VkDevice) **may** be restricted by implementation-
or platform-dependent limits.
The [`maxMemoryAllocationCount`](limits.html#limits-maxMemoryAllocationCount)
feature describes the number of allocations that **can** exist simultaneously
before encountering these internal limits.

|  | For historical reasons, if `maxMemoryAllocationCount` is exceeded, some
| --- | --- |
implementations may return [VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult).
Exceeding this limit will result in **undefined** behavior, and an application
should not rely on the use of the returned error code in order to identify
when the limit is reached. |

|  | Many protected memory implementations involve complex hardware and system
| --- | --- |
software support, and often have additional and much lower limits on the
number of simultaneous protected memory allocations (from memory types with
the [VK_MEMORY_PROPERTY_PROTECTED_BIT](#VkMemoryPropertyFlagBits) property) than for non-protected
memory allocations.
These limits can be system-wide, and depend on a variety of factors outside
of the Vulkan implementation, so they cannot be queried in Vulkan.
Applications **should** use as few allocations as possible from such memory
types by suballocating aggressively, and be prepared for allocation failure
even when there is apparently plenty of capacity remaining in the memory
heap.
As a guideline, the Vulkan conformance test suite requires that at least 80
minimum-size allocations can exist concurrently when no other uses of
protected memory are active in the system. |

Some platforms **may** have a limit on the maximum size of a single allocation.
For example, certain systems **may** fail to create allocations with a size
greater than or equal to 4GB.
Such a limit is implementation-dependent, and if such a failure occurs then
the error [VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult) **must** be returned.
This limit is advertised in
[VkPhysicalDeviceMaintenance3Properties](limits.html#VkPhysicalDeviceMaintenance3Properties)::`maxMemoryAllocationSize`.

The cumulative memory size allocated to a heap **can** be limited by the size
of the specified heap.
In such cases, allocated memory is tracked on a per-device and per-heap
basis.
Some platforms allow overallocation into other heaps.
The overallocation behavior **can** be specified through the
`[VK_AMD_memory_overallocation_behavior](../appendices/extensions.html#VK_AMD_memory_overallocation_behavior)` extension.

If the `memoryTypeIndex` belongs to a heap with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](#VkMemoryHeapFlagBits) bit included in its properties,
this allocation is backed by tile memory, which is an on device cache.
Unlike other heaps, allocations out of the tile memory will always have a
starting address at the start of the heap and its contents are aliased with
all other [VkDeviceMemory](#VkDeviceMemory) objects bound to the same range while
executing within the same [*tile memory scope*](#memory-tile-heaps).

If the
[VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT](features.html#VkPhysicalDevicePageableDeviceLocalMemoryFeaturesEXT)::`pageableDeviceLocalMemory`
feature is enabled, memory allocations made from a heap that includes
[VK_MEMORY_HEAP_DEVICE_LOCAL_BIT](#VkMemoryHeapFlagBits) in [VkMemoryHeap](#VkMemoryHeap)::`flags`
**may** be transparently moved to host-local memory allowing multiple
applications to share device-local memory.
If there is no space left in device-local memory when this new allocation is
made, other allocations **may** be moved out transparently to make room.
The operating system will determine which allocations to move to
device-local memory or host-local memory based on platform-specific
criteria.
To help the operating system make good choices, the application **should** set
the appropriate memory priority with [VkMemoryPriorityAllocateInfoEXT](#VkMemoryPriorityAllocateInfoEXT)
and adjust it as necessary with [vkSetDeviceMemoryPriorityEXT](#vkSetDeviceMemoryPriorityEXT).
Higher priority allocations will moved to device-local memory first.

Memory allocations made on heaps without the
[VK_MEMORY_HEAP_DEVICE_LOCAL_BIT](#VkMemoryHeapFlagBits) property will not be transparently
promoted to device-local memory by the operating system.

Valid Usage

* 
[](#VUID-vkAllocateMemory-pAllocateInfo-01713) VUID-vkAllocateMemory-pAllocateInfo-01713

`pAllocateInfo->allocationSize` **must** be less than or equal to
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)::`memoryHeaps`[memindex].`size`
where `memindex` =
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)::`memoryTypes`[`pAllocateInfo->memoryTypeIndex`].`heapIndex`
as returned by [vkGetPhysicalDeviceMemoryProperties](#vkGetPhysicalDeviceMemoryProperties) for the
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) that `device` was created from

* 
[](#VUID-vkAllocateMemory-pAllocateInfo-01714) VUID-vkAllocateMemory-pAllocateInfo-01714

`pAllocateInfo->memoryTypeIndex` **must** be less than
[VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)::`memoryTypeCount` as
returned by [vkGetPhysicalDeviceMemoryProperties](#vkGetPhysicalDeviceMemoryProperties) for the
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) that `device` was created from

* 
[](#VUID-vkAllocateMemory-deviceCoherentMemory-02790) VUID-vkAllocateMemory-deviceCoherentMemory-02790

If the [`deviceCoherentMemory`](features.html#features-deviceCoherentMemory)
feature is not enabled, `pAllocateInfo->memoryTypeIndex` **must** not
identify a memory type supporting
[VK_MEMORY_PROPERTY_DEVICE_COHERENT_BIT_AMD](#VkMemoryPropertyFlagBits)

* 
[](#VUID-vkAllocateMemory-maxMemoryAllocationCount-04101) VUID-vkAllocateMemory-maxMemoryAllocationCount-04101

There **must** be less than
`VkPhysicalDeviceLimits`::`maxMemoryAllocationCount` device
memory allocations currently allocated on the device

* 
[](#VUID-vkAllocateMemory-tileMemoryHeap-10976) VUID-vkAllocateMemory-tileMemoryHeap-10976

If the [`tileMemoryHeap`](features.html#features-tileMemoryHeap) feature is not
enabled, `pAllocateInfo->memoryTypeIndex` **must** not identify a
memory type that corresponds to a [VkMemoryHeap](#VkMemoryHeap) with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](#VkMemoryHeapFlagBits) property

Valid Usage (Implicit)

* 
[](#VUID-vkAllocateMemory-device-parameter) VUID-vkAllocateMemory-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAllocateMemory-pAllocateInfo-parameter) VUID-vkAllocateMemory-pAllocateInfo-parameter

 `pAllocateInfo` **must** be a valid pointer to a valid [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure

* 
[](#VUID-vkAllocateMemory-pAllocator-parameter) VUID-vkAllocateMemory-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](#VkAllocationCallbacks) structure

* 
[](#VUID-vkAllocateMemory-pMemory-parameter) VUID-vkAllocateMemory-pMemory-parameter

 `pMemory` **must** be a valid pointer to a [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-vkAllocateMemory-device-queuecount) VUID-vkAllocateMemory-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMemoryAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeIndex;
} VkMemoryAllocateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the allocation in bytes.

* 
`memoryTypeIndex` is an index identifying a memory type from the
`memoryTypes` array of the [VkPhysicalDeviceMemoryProperties](#VkPhysicalDeviceMemoryProperties)
structure.

The internal data of an allocated device memory object **must** include a
reference to implementation-specific resources, referred to as the memory
object’s *payload*.
Applications **can** also import and export that internal data to and from
device memory objects to share data between Vulkan instances and other
compatible APIs.
A `VkMemoryAllocateInfo` structure defines a memory import operation if
its `pNext` chain includes one of the following structures:

* 
[VkImportMemoryWin32HandleInfoKHR](#VkImportMemoryWin32HandleInfoKHR) with a non-zero `handleType`
value

* 
[VkImportMemoryFdInfoKHR](#VkImportMemoryFdInfoKHR) with a non-zero `handleType` value

* 
[VkImportMemoryHostPointerInfoEXT](#VkImportMemoryHostPointerInfoEXT) with a non-zero `handleType`
value

* 
[VkImportAndroidHardwareBufferInfoANDROID](#VkImportAndroidHardwareBufferInfoANDROID) with a non-`NULL`
`buffer` value

* 
[VkImportMemoryZirconHandleInfoFUCHSIA](#VkImportMemoryZirconHandleInfoFUCHSIA) with a non-zero
`handleType` value

* 
[VkImportMemoryBufferCollectionFUCHSIA](resources.html#VkImportMemoryBufferCollectionFUCHSIA)

* 
[VkImportScreenBufferInfoQNX](#VkImportScreenBufferInfoQNX) with a non-`NULL` `buffer` value

* 
[VkImportMemoryMetalHandleInfoEXT](#VkImportMemoryMetalHandleInfoEXT) with a non-zero `handleType`
value

If the parameters define an import operation and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`allocationSize` is ignored.
The implementation **must** query the size of these allocations from the OS.

If the parameters define an import operation and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`allocationSize` is ignored.
The implementation **must** query the size of these allocations from the OS.

Whether device memory objects constructed via a memory import operation hold
a reference to their payload depends on the properties of the handle type
used to perform the import, as defined below for each valid handle type.
Importing memory **must** not modify the content of the memory.
Implementations **must** ensure that importing memory does not enable the
importing Vulkan instance to access any memory or resources in other Vulkan
instances other than that corresponding to the memory object imported.
Implementations **must** also ensure accessing imported memory which has not
been initialized does not allow the importing Vulkan instance to obtain data
from the exporting Vulkan instance or vice-versa.

|  | How exported and imported memory is isolated is left to the implementation,
| --- | --- |
but applications should be aware that such isolation **may** prevent
implementations from placing multiple exportable memory objects in the same
physical or virtual page.
Hence, applications **should** avoid creating many small external memory
objects whenever possible. |

Importing memory **must** not increase overall heap usage within a system.
However, it **must** affect the following per-process values:

* 
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`maxMemoryAllocationCount`

* 
[VkPhysicalDeviceMemoryBudgetPropertiesEXT](#VkPhysicalDeviceMemoryBudgetPropertiesEXT)::`heapUsage`

When performing a memory import operation, it is the responsibility of the
application to ensure the external handles and their associated payloads
meet all valid usage requirements.
However, implementations **must** perform sufficient validation of external
handles and payloads to ensure that the operation results in a valid memory
object which will not cause program termination, device loss, queue stalls,
or corruption of other resources when used as allowed according to its
allocation parameters.
If the external handle provided does not meet these requirements, the
implementation **must** fail the memory import operation with the error code
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult).
If the parameters define an export operation and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
implementations **should** not strictly follow `memoryTypeIndex`.
Instead, they **should** modify the allocation internally to use the required
memory type for the application’s given usage.
This is because for an export operation, there is currently no way for the
application to know the memory type index before allocating.

Valid Usage

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07897) VUID-VkMemoryAllocateInfo-allocationSize-07897

If the parameters do not define an [import or    export operation](#memory-import-operation),
`allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-None-06657) VUID-VkMemoryAllocateInfo-None-06657

The parameters **must** not define more than one
[import operation](#memory-import-operation)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07899) VUID-VkMemoryAllocateInfo-allocationSize-07899

If the parameters define an export operation
and the handle type is not
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
, `allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-buffer-06380) VUID-VkMemoryAllocateInfo-buffer-06380

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA), and
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)::`buffer` is present and
non-NULL, [VkImportMemoryBufferCollectionFUCHSIA](resources.html#VkImportMemoryBufferCollectionFUCHSIA)::`collection`
and [VkImportMemoryBufferCollectionFUCHSIA](resources.html#VkImportMemoryBufferCollectionFUCHSIA)::`index` **must** match
[VkBufferCollectionBufferCreateInfoFUCHSIA](resources.html#VkBufferCollectionBufferCreateInfoFUCHSIA)::`collection` and
[VkBufferCollectionBufferCreateInfoFUCHSIA](resources.html#VkBufferCollectionBufferCreateInfoFUCHSIA)::`index`,
respectively, of the [VkBufferCollectionBufferCreateInfoFUCHSIA](resources.html#VkBufferCollectionBufferCreateInfoFUCHSIA)
structure used to create the
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)::`buffer`

* 
[](#VUID-VkMemoryAllocateInfo-image-06381) VUID-VkMemoryAllocateInfo-image-06381

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA), and
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)::`image` is present and
non-NULL, [VkImportMemoryBufferCollectionFUCHSIA](resources.html#VkImportMemoryBufferCollectionFUCHSIA)::`collection`
and [VkImportMemoryBufferCollectionFUCHSIA](resources.html#VkImportMemoryBufferCollectionFUCHSIA)::`index` **must** match
[VkBufferCollectionImageCreateInfoFUCHSIA](resources.html#VkBufferCollectionImageCreateInfoFUCHSIA)::`collection` and
[VkBufferCollectionImageCreateInfoFUCHSIA](resources.html#VkBufferCollectionImageCreateInfoFUCHSIA)::`index`,
respectively, of the [VkBufferCollectionImageCreateInfoFUCHSIA](resources.html#VkBufferCollectionImageCreateInfoFUCHSIA)
structure used to create the
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)::`image`

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-06382) VUID-VkMemoryAllocateInfo-allocationSize-06382

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA), `allocationSize` **must** match
[VkMemoryRequirements](resources.html#VkMemoryRequirements)::`size` value retrieved by
[vkGetImageMemoryRequirements](resources.html#vkGetImageMemoryRequirements) or
[vkGetBufferMemoryRequirements](resources.html#vkGetBufferMemoryRequirements) for image-based or buffer-based
collections respectively

* 
[](#VUID-VkMemoryAllocateInfo-pNext-06383) VUID-VkMemoryAllocateInfo-pNext-06383

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA), the `pNext` chain **must** include a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with either its
`image` or `buffer` field set to a value other than
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkMemoryAllocateInfo-image-06384) VUID-VkMemoryAllocateInfo-image-06384

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA) and
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)::`image` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `image` **must** be created with a
[VkBufferCollectionImageCreateInfoFUCHSIA](resources.html#VkBufferCollectionImageCreateInfoFUCHSIA) structure chained to its
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`pNext` pointer

* 
[](#VUID-VkMemoryAllocateInfo-buffer-06385) VUID-VkMemoryAllocateInfo-buffer-06385

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA) and
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)::`buffer` is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `buffer` **must** be created with a
[VkBufferCollectionBufferCreateInfoFUCHSIA](resources.html#VkBufferCollectionBufferCreateInfoFUCHSIA) structure chained to its
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`pNext` pointer

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-06386) VUID-VkMemoryAllocateInfo-memoryTypeIndex-06386

If the parameters define an import operation from an
[VkBufferCollectionFUCHSIA](resources.html#VkBufferCollectionFUCHSIA), `memoryTypeIndex` **must** be from
[VkBufferCollectionPropertiesFUCHSIA](resources.html#VkBufferCollectionPropertiesFUCHSIA) as retrieved by
[vkGetBufferCollectionPropertiesFUCHSIA](resources.html#vkGetBufferCollectionPropertiesFUCHSIA)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-00639) VUID-VkMemoryAllocateInfo-pNext-00639

If the `pNext` chain includes a `VkExportMemoryAllocateInfo`
structure, and any of the handle types specified in
`VkExportMemoryAllocateInfo`::`handleTypes` require a dedicated
allocation, as reported by
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) in
`VkExternalImageFormatProperties`::`externalMemoryProperties.externalMemoryFeatures`,
or by [vkGetPhysicalDeviceExternalBufferProperties](capabilities.html#vkGetPhysicalDeviceExternalBufferProperties) in
`VkExternalBufferProperties`::`externalMemoryProperties.externalMemoryFeatures`,
the `pNext` chain **must** include a
`VkMemoryDedicatedAllocateInfo` or
`VkDedicatedAllocationMemoryAllocateInfoNV` structure with either
its `image` or `buffer` member set to a value other than
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-09858) VUID-VkMemoryAllocateInfo-pNext-09858

If the `pNext` chain includes a `VkExportMemoryAllocateInfo`
structure, and any of the handle types specified in
`VkExportMemoryAllocateInfo`::`handleTypes` require a dedicated
allocation, as reported by
[vkGetPhysicalDeviceExternalTensorPropertiesARM](capabilities.html#vkGetPhysicalDeviceExternalTensorPropertiesARM) in
`VkExternalTensorPropertiesARM`::`externalMemoryProperties.externalMemoryFeatures`,
the `pNext` chain **must** include a
`VkMemoryDedicatedAllocateInfoTensorARM` structure with its
`tensor` member set to a value other than [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-00640) VUID-VkMemoryAllocateInfo-pNext-00640

If the `pNext` chain includes a [VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)
structure, it **must** not include a [VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV) or
[VkExportMemoryWin32HandleInfoNV](#VkExportMemoryWin32HandleInfoNV) structure

* 
[](#VUID-VkMemoryAllocateInfo-pNext-00641) VUID-VkMemoryAllocateInfo-pNext-00641

If the `pNext` chain includes a
[VkImportMemoryWin32HandleInfoKHR](#VkImportMemoryWin32HandleInfoKHR) structure, it **must** not include a
[VkImportMemoryWin32HandleInfoNV](#VkImportMemoryWin32HandleInfoNV) structure

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-01742) VUID-VkMemoryAllocateInfo-allocationSize-01742

If the parameters define an import operation, the external handle
specified was created by the Vulkan API, and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), then the values of
`allocationSize` and `memoryTypeIndex` **must** match those
specified when the payload being imported was created

* 
[](#VUID-VkMemoryAllocateInfo-None-00643) VUID-VkMemoryAllocateInfo-None-00643

If the parameters define an import operation and the external handle
specified was created by the Vulkan API, the device mask specified by
[VkMemoryAllocateFlagsInfo](#VkMemoryAllocateFlagsInfo) **must** match the mask specified when the
payload being imported was allocated

* 
[](#VUID-VkMemoryAllocateInfo-None-00644) VUID-VkMemoryAllocateInfo-None-00644

If the parameters define an import operation and the external handle
specified was created by the Vulkan API, the list of physical devices
that comprise the logical device passed to [vkAllocateMemory](#vkAllocateMemory) **must**
match the list of physical devices that comprise the logical device on
which the payload was originally allocated

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-00645) VUID-VkMemoryAllocateInfo-memoryTypeIndex-00645

If the parameters define an import operation and the external handle is
an NT handle or a global share handle created outside of the Vulkan API,
the value of `memoryTypeIndex` **must** be one of those returned by
[vkGetMemoryWin32HandlePropertiesKHR](#vkGetMemoryWin32HandlePropertiesKHR)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-01743) VUID-VkMemoryAllocateInfo-allocationSize-01743

If the parameters define an import operation, the external handle was
created by the Vulkan API, and the external handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), then the
values of `allocationSize` and `memoryTypeIndex` **must** match
those specified when the payload being imported was created

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-00647) VUID-VkMemoryAllocateInfo-allocationSize-00647

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`allocationSize` **must** match the size specified when creating the
Direct3D 12 heap from which the payload was extracted

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-00648) VUID-VkMemoryAllocateInfo-memoryTypeIndex-00648

If the parameters define an import operation and the external handle is
a POSIX file descriptor created outside of the Vulkan API, the value of
`memoryTypeIndex` **must** be one of those returned by
[vkGetMemoryFdPropertiesKHR](#vkGetMemoryFdPropertiesKHR)

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-01872) VUID-VkMemoryAllocateInfo-memoryTypeIndex-01872

If the [`protectedMemory`](features.html#features-protectedMemory) feature is
not enabled, the `VkMemoryAllocateInfo`::`memoryTypeIndex` **must**
not indicate a memory type that reports
[VK_MEMORY_PROPERTY_PROTECTED_BIT](#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-01744) VUID-VkMemoryAllocateInfo-memoryTypeIndex-01744

If the parameters define an import operation and the external handle is
a host pointer, the value of `memoryTypeIndex` **must** be one of those
returned by [vkGetMemoryHostPointerPropertiesEXT](#vkGetMemoryHostPointerPropertiesEXT)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-01745) VUID-VkMemoryAllocateInfo-allocationSize-01745

If the parameters define an import operation and the external handle is
a host pointer, `allocationSize` **must** be an integer multiple of
`VkPhysicalDeviceExternalMemoryHostPropertiesEXT`::`minImportedHostPointerAlignment`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02805) VUID-VkMemoryAllocateInfo-pNext-02805

If the parameters define an import operation and the external handle is
a host pointer, the `pNext` chain **must** not include a
[VkDedicatedAllocationMemoryAllocateInfoNV](#VkDedicatedAllocationMemoryAllocateInfoNV) structure with either
its `image` or `buffer` field set to a value other than
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02806) VUID-VkMemoryAllocateInfo-pNext-02806

If the parameters define an import operation and the external handle is
a host pointer, the `pNext` chain **must** not include a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with either its
`image` or `buffer` field set to a value other than
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-02383) VUID-VkMemoryAllocateInfo-allocationSize-02383

If the parameters define an import operation and the external handle
type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`allocationSize` **must** be the size returned by
[vkGetAndroidHardwareBufferPropertiesANDROID](#vkGetAndroidHardwareBufferPropertiesANDROID) for the Android
hardware buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02384) VUID-VkMemoryAllocateInfo-pNext-02384

If the parameters define an import operation and the external handle
type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
and the `pNext` chain does not include a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure or
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)::`image` is
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the Android hardware buffer **must** have a
`AHardwareBuffer_Desc`::`format` of
`AHARDWAREBUFFER_FORMAT_BLOB` and a
`AHardwareBuffer_Desc`::`usage` that includes
`AHARDWAREBUFFER_USAGE_GPU_DATA_BUFFER`

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-02385) VUID-VkMemoryAllocateInfo-memoryTypeIndex-02385

If the parameters define an import operation and the external handle
type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`memoryTypeIndex` **must** be one of those returned by
[vkGetAndroidHardwareBufferPropertiesANDROID](#vkGetAndroidHardwareBufferPropertiesANDROID) for the Android
hardware buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-01874) VUID-VkMemoryAllocateInfo-pNext-01874

If the parameters do not define an import operation, and the `pNext`
chain includes a `VkExportMemoryAllocateInfo` structure with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
included in its `handleTypes` member, and the `pNext` chain
includes a [VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with
`image` not equal to [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `allocationSize`
**must** be `0`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-07900) VUID-VkMemoryAllocateInfo-pNext-07900

If the parameters define an export operation, the handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
and the `pNext` does not include a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure, `allocationSize`
**must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-07901) VUID-VkMemoryAllocateInfo-pNext-07901

If the parameters define an export operation, the handle type is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
and the `pNext` chain includes a [VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)
structure with `buffer` set to a valid [VkBuffer](resources.html#VkBuffer) object,
`allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02386) VUID-VkMemoryAllocateInfo-pNext-02386

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) with `image` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the Android hardware buffer’s
`AHardwareBuffer`::`usage` **must** include at least one of
`AHARDWAREBUFFER_USAGE_GPU_FRAMEBUFFER`,
`AHARDWAREBUFFER_USAGE_GPU_SAMPLED_IMAGE` or
`AHARDWAREBUFFER_USAGE_GPU_DATA_BUFFER`

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02387) VUID-VkMemoryAllocateInfo-pNext-02387

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) with `image` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the format of `image` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) or the format returned by
[vkGetAndroidHardwareBufferPropertiesANDROID](#vkGetAndroidHardwareBufferPropertiesANDROID) in
[VkAndroidHardwareBufferFormatPropertiesANDROID](#VkAndroidHardwareBufferFormatPropertiesANDROID)::`format` for
the Android hardware buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02388) VUID-VkMemoryAllocateInfo-pNext-02388

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with `image` that is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the width, height, and array layer dimensions
of `image` and the Android hardware buffer’s
`AHardwareBuffer_Desc` **must** be identical

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02389) VUID-VkMemoryAllocateInfo-pNext-02389

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with `image` that is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and the Android hardware buffer’s
`AHardwareBuffer`::`usage` includes
`AHARDWAREBUFFER_USAGE_GPU_MIPMAP_COMPLETE`, the `image` **must**
have a complete mipmap chain

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02586) VUID-VkMemoryAllocateInfo-pNext-02586

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with `image` that is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), and the Android hardware buffer’s
`AHardwareBuffer`::`usage` does not include
`AHARDWAREBUFFER_USAGE_GPU_MIPMAP_COMPLETE`, the `image` **must**
have exactly one mipmap level

* 
[](#VUID-VkMemoryAllocateInfo-pNext-02390) VUID-VkMemoryAllocateInfo-pNext-02390

If the parameters define an import operation, the external handle is an
Android hardware buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with `image` that is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), each bit set in the usage of `image` **must**
be listed in
[AHardwareBuffer Usage    Equivalence](#memory-external-android-hardware-buffer-usage), and if there is a corresponding
`AHARDWAREBUFFER_USAGE` bit listed that bit **must** be included in the
Android hardware buffer’s `AHardwareBuffer_Desc`::`usage`

* 
[](#VUID-VkMemoryAllocateInfo-screenBufferImport-08941) VUID-VkMemoryAllocateInfo-screenBufferImport-08941

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX](features.html#VkPhysicalDeviceExternalMemoryScreenBufferFeaturesQNX)::`screenBufferImport`
**must** be enabled

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-08942) VUID-VkMemoryAllocateInfo-allocationSize-08942

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`allocationSize` **must** be the size returned by
[vkGetScreenBufferPropertiesQNX](#vkGetScreenBufferPropertiesQNX) for the QNX Screen buffer

* 
[](#VUID-VkMemoryAllocateInfo-memoryTypeIndex-08943) VUID-VkMemoryAllocateInfo-memoryTypeIndex-08943

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`memoryTypeIndex` **must** be one of those returned by
[vkGetScreenBufferPropertiesQNX](#vkGetScreenBufferPropertiesQNX) for the QNX Screen buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-08944) VUID-VkMemoryAllocateInfo-pNext-08944

If the parameters define an import operation, the external handle is a
QNX Screen buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) with `image` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the QNX Screen’s buffer **must** be a
[valid QNX Screen buffer](#memory-external-screen-buffer-validity)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-08945) VUID-VkMemoryAllocateInfo-pNext-08945

If the parameters define an import operation, the external handle is an
QNX Screen buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) with `image` that is not
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the format of `image` **must** be
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) or the format returned by
[vkGetScreenBufferPropertiesQNX](#vkGetScreenBufferPropertiesQNX) in
[VkScreenBufferFormatPropertiesQNX](#VkScreenBufferFormatPropertiesQNX)::`format` for the QNX Screen
buffer

* 
[](#VUID-VkMemoryAllocateInfo-pNext-08946) VUID-VkMemoryAllocateInfo-pNext-08946

If the parameters define an import operation, the external handle is a
QNX Screen buffer, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with `image` that is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the width, height, and array layer dimensions
of `image` and the QNX Screen buffer’s `_screen_buffer` **must** be
identical

* 
[](#VUID-VkMemoryAllocateInfo-pNext-10395) VUID-VkMemoryAllocateInfo-pNext-10395

If the parameters define an import operation and the external handle is
a [VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), then
`pNext` **must** include a [VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) with
`image` that is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-10396) VUID-VkMemoryAllocateInfo-pNext-10396

If the parameters define an import operation, the external handle is a
Metal MTLTexture, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with `image` that is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the width, height, array layer dimensions, and
mipmap levels of `image` and the Metal MTLTexture’s **must** be
identical

* 
[](#VUID-VkMemoryAllocateInfo-pNext-10397) VUID-VkMemoryAllocateInfo-pNext-10397

If the parameters define an import operation, the external handle is a
Metal MTLTexture, and the `pNext` chain includes a
[VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo) structure with `image` that is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `allocationSize` **must** be `0`

* 
[](#VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03329) VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03329

If
[VkMemoryOpaqueCaptureAddressAllocateInfo](#VkMemoryOpaqueCaptureAddressAllocateInfo)::`opaqueCaptureAddress`
is not zero, `VkMemoryAllocateFlagsInfo`::`flags` **must** include
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkMemoryAllocateFlagBitsKHR)

* 
[](#VUID-VkMemoryAllocateInfo-flags-03330) VUID-VkMemoryAllocateInfo-flags-03330

If `VkMemoryAllocateFlagsInfo`::`flags` includes
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkMemoryAllocateFlagBitsKHR), the
[    `bufferDeviceAddressCaptureReplay`](features.html#features-bufferDeviceAddressCaptureReplay) feature **must** be enabled

* 
[](#VUID-VkMemoryAllocateInfo-flags-03331) VUID-VkMemoryAllocateInfo-flags-03331

If `VkMemoryAllocateFlagsInfo`::`flags` includes
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](#VkMemoryAllocateFlagBitsKHR), the
[`bufferDeviceAddress`](features.html#features-bufferDeviceAddress) feature
**must** be enabled

* 
[](#VUID-VkMemoryAllocateInfo-pNext-03332) VUID-VkMemoryAllocateInfo-pNext-03332

If the `pNext` chain includes a
`VkImportMemoryHostPointerInfoEXT` structure,
[VkMemoryOpaqueCaptureAddressAllocateInfo](#VkMemoryOpaqueCaptureAddressAllocateInfo)::`opaqueCaptureAddress`
**must** be zero

* 
[](#VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03333) VUID-VkMemoryAllocateInfo-opaqueCaptureAddress-03333

If the parameters define an import operation,
[VkMemoryOpaqueCaptureAddressAllocateInfo](#VkMemoryOpaqueCaptureAddressAllocateInfo)::`opaqueCaptureAddress`
**must** be zero

* 
[](#VUID-VkMemoryAllocateInfo-None-04749) VUID-VkMemoryAllocateInfo-None-04749

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the
value of `memoryTypeIndex` **must** be an index identifying a memory
type from the `memoryTypeBits` field of the
[VkMemoryZirconHandlePropertiesFUCHSIA](#VkMemoryZirconHandlePropertiesFUCHSIA) structure populated by a
call to [vkGetMemoryZirconHandlePropertiesFUCHSIA](#vkGetMemoryZirconHandlePropertiesFUCHSIA)

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07902) VUID-VkMemoryAllocateInfo-allocationSize-07902

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the
value of `allocationSize` **must** be greater than `0`

* 
[](#VUID-VkMemoryAllocateInfo-allocationSize-07903) VUID-VkMemoryAllocateInfo-allocationSize-07903

If the parameters define an import operation and the external handle
type is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the
value of `allocationSize` **must** be less than or equal to the size of
the VMO as determined by `zx_vmo_get_size`(`handle`) where
`handle` is the VMO handle to the imported external memory

* 
[](#VUID-VkMemoryAllocateInfo-pNext-06780) VUID-VkMemoryAllocateInfo-pNext-06780

If the `pNext` chain includes a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure, its
`exportObjectType` member **must** be
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryAllocateInfo-sType-sType) VUID-VkMemoryAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryAllocateInfo-pNext-pNext) VUID-VkMemoryAllocateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDedicatedAllocationMemoryAllocateInfoNV](#VkDedicatedAllocationMemoryAllocateInfoNV), [VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo), [VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV), [VkExportMemoryWin32HandleInfoKHR](#VkExportMemoryWin32HandleInfoKHR), [VkExportMemoryWin32HandleInfoNV](#VkExportMemoryWin32HandleInfoNV), [VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT), [VkImportAndroidHardwareBufferInfoANDROID](#VkImportAndroidHardwareBufferInfoANDROID), [VkImportMemoryBufferCollectionFUCHSIA](resources.html#VkImportMemoryBufferCollectionFUCHSIA), [VkImportMemoryFdInfoKHR](#VkImportMemoryFdInfoKHR), [VkImportMemoryHostPointerInfoEXT](#VkImportMemoryHostPointerInfoEXT), [VkImportMemoryMetalHandleInfoEXT](#VkImportMemoryMetalHandleInfoEXT), [VkImportMemoryWin32HandleInfoKHR](#VkImportMemoryWin32HandleInfoKHR), [VkImportMemoryWin32HandleInfoNV](#VkImportMemoryWin32HandleInfoNV), [VkImportMemoryZirconHandleInfoFUCHSIA](#VkImportMemoryZirconHandleInfoFUCHSIA), [VkImportMetalBufferInfoEXT](#VkImportMetalBufferInfoEXT), [VkImportNativeBufferInfoOHOS](resources.html#VkImportNativeBufferInfoOHOS), [VkImportScreenBufferInfoQNX](#VkImportScreenBufferInfoQNX), [VkMemoryAllocateFlagsInfo](#VkMemoryAllocateFlagsInfo), [VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo), [VkMemoryDedicatedAllocateInfoTensorARM](#VkMemoryDedicatedAllocateInfoTensorARM), [VkMemoryOpaqueCaptureAddressAllocateInfo](#VkMemoryOpaqueCaptureAddressAllocateInfo), or [VkMemoryPriorityAllocateInfoEXT](#VkMemoryPriorityAllocateInfoEXT)

* 
[](#VUID-VkMemoryAllocateInfo-sType-unique) VUID-VkMemoryAllocateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT)

If the `pNext` chain includes a `VkMemoryDedicatedAllocateInfo`
structure, then that structure includes a handle of the sole buffer or image
resource that the memory **can** be bound to.

The `VkMemoryDedicatedAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryDedicatedAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    VkBuffer           buffer;
} VkMemoryDedicatedAllocateInfo;

// Provided by VK_KHR_dedicated_allocation
// Equivalent to VkMemoryDedicatedAllocateInfo
typedef VkMemoryDedicatedAllocateInfo VkMemoryDedicatedAllocateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a handle of an image which this
memory will be bound to.

* 
`buffer` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a handle of a buffer which this
memory will be bound to.

Valid Usage

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01432) VUID-VkMemoryDedicatedAllocateInfo-image-01432

At least one of `image` and `buffer` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-02964) VUID-VkMemoryDedicatedAllocateInfo-image-02964

    If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
    and the memory is not an imported
Android Hardware Buffer
or an imported
QNX Screen buffer
    , `VkMemoryAllocateInfo`::`allocationSize` **must** be greater than
    or equal to the `VkMemoryRequirements`::`size` of the image

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01434) VUID-VkMemoryDedicatedAllocateInfo-image-01434

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `image` **must** have been
created without [VK_IMAGE_CREATE_SPARSE_BINDING_BIT](resources.html#VkImageCreateFlagBits) set in
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-02965) VUID-VkMemoryDedicatedAllocateInfo-buffer-02965

    If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)
    and the memory is not an imported
Android Hardware Buffer
or an imported
QNX Screen buffer
    , `VkMemoryAllocateInfo`::`allocationSize` **must** be greater than
    or equal to the `VkMemoryRequirements`::`size` of the buffer

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-01436) VUID-VkMemoryDedicatedAllocateInfo-buffer-01436

If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `buffer` **must** have
been created without [VK_BUFFER_CREATE_SPARSE_BINDING_BIT](resources.html#VkBufferCreateFlagBits) set in
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`flags`

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01876) VUID-VkMemoryDedicatedAllocateInfo-image-01876

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), and the
external handle was created by the Vulkan API, then the memory being
imported **must** also be a dedicated image allocation and `image`
**must** be identical to the image associated with the imported memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-01877) VUID-VkMemoryDedicatedAllocateInfo-buffer-01877

If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_KMT_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), and the
external handle was created by the Vulkan API, then the memory being
imported **must** also be a dedicated buffer allocation and `buffer`
**must** be identical to the buffer associated with the imported memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01878) VUID-VkMemoryDedicatedAllocateInfo-image-01878

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the memory
being imported **must** also be a dedicated image allocation and
`image` **must** be identical to the image associated with the imported
memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-01879) VUID-VkMemoryDedicatedAllocateInfo-buffer-01879

If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the memory
being imported **must** also be a dedicated buffer allocation and
`buffer` **must** be identical to the buffer associated with the
imported memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-01797) VUID-VkMemoryDedicatedAllocateInfo-image-01797

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `image` **must** not have
been created with [VK_IMAGE_CREATE_DISJOINT_BIT](resources.html#VkImageCreateFlagBits) set in
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-04751) VUID-VkMemoryDedicatedAllocateInfo-image-04751

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the
memory being imported **must** also be a dedicated image allocation and
`image` **must** be identical to the image associated with the imported
memory

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-04752) VUID-VkMemoryDedicatedAllocateInfo-buffer-04752

If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation with handle
type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the
memory being imported **must** also be a dedicated buffer allocation and
`buffer` **must** be identical to the buffer associated with the
imported memory

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-sType-sType) VUID-VkMemoryDedicatedAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-image-parameter) VUID-VkMemoryDedicatedAllocateInfo-image-parameter

 If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-buffer-parameter) VUID-VkMemoryDedicatedAllocateInfo-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-VkMemoryDedicatedAllocateInfo-commonparent) VUID-VkMemoryDedicatedAllocateInfo-commonparent

 Both of `buffer`, and `image` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To bind a range of tile memory to the command buffer, call:

// Provided by VK_QCOM_tile_memory_heap
void vkCmdBindTileMemoryQCOM(
    VkCommandBuffer                             commandBuffer,
    const VkTileMemoryBindInfoQCOM*             pTileMemoryBindInfo);

* 
`commandBuffer` is the command buffer that the tile memory will be
bound to.

* 
`pTileMemoryBindInfo` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a pointer to a
[VkTileMemoryBindInfoQCOM](#VkTileMemoryBindInfoQCOM) structure defining how tile memory is
bound.

Calling [vkCmdBindTileMemoryQCOM](#vkCmdBindTileMemoryQCOM) when `pTileMemoryBindInfo` is
`NULL` is equivalent to binding no tile memory to the command buffer.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindTileMemoryQCOM-commandBuffer-parameter) VUID-vkCmdBindTileMemoryQCOM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindTileMemoryQCOM-pTileMemoryBindInfo-parameter) VUID-vkCmdBindTileMemoryQCOM-pTileMemoryBindInfo-parameter

 If `pTileMemoryBindInfo` is not `NULL`, `pTileMemoryBindInfo` **must** be a valid pointer to a valid [VkTileMemoryBindInfoQCOM](#VkTileMemoryBindInfoQCOM) structure

* 
[](#VUID-vkCmdBindTileMemoryQCOM-commandBuffer-recording) VUID-vkCmdBindTileMemoryQCOM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindTileMemoryQCOM-commandBuffer-cmdpool) VUID-vkCmdBindTileMemoryQCOM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindTileMemoryQCOM-renderpass) VUID-vkCmdBindTileMemoryQCOM-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdBindTileMemoryQCOM-videocoding) VUID-vkCmdBindTileMemoryQCOM-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindTileMemoryQCOM is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkTileMemoryBindInfoQCOM` structure is defined as:

// Provided by VK_QCOM_tile_memory_heap
typedef struct VkTileMemoryBindInfoQCOM {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkTileMemoryBindInfoQCOM;

* 
`memory` is the tile memory object to be bound.

`memory` is used to bind this memory object to tile memory for all
subsequent commands in the `commandBuffer`.
Tile memory contents for ranges in the heap outside the bound `memory`
are discarded and become **undefined** for the [active *tile memory scope*](#memory-tile-heaps) if an action command is executed.

For secondary command buffers executing within a render pass instance, the
active bound tile memory object is provided with this structure included in
the `pNext` chain of `VkCommandBufferInheritanceInfo`.

If this structure was not specified since recording started for
`commandBuffer`, no tile memory is bound to the command buffer and all
contents become **undefined** for the *tile memory scope* if an action command
is executed.

Valid Usage

* 
[](#VUID-VkTileMemoryBindInfoQCOM-memory-10726) VUID-VkTileMemoryBindInfoQCOM-memory-10726

`memory` **must** have been allocated from a [VkMemoryHeap](#VkMemoryHeap) with
the [VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](#VkMemoryHeapFlagBits) property

Valid Usage (Implicit)

* 
[](#VUID-VkTileMemoryBindInfoQCOM-sType-sType) VUID-VkTileMemoryBindInfoQCOM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TILE_MEMORY_BIND_INFO_QCOM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTileMemoryBindInfoQCOM-memory-parameter) VUID-VkTileMemoryBindInfoQCOM-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)

If the `pNext` chain includes a
`VkMemoryDedicatedAllocateInfoTensorARM` structure, then that structure
includes a handle of the sole tensor resource that the memory **can** be bound
to.

The `VkMemoryDedicatedAllocateInfoTensorARM` structure is defined as:

// Provided by VK_ARM_tensors
typedef struct VkMemoryDedicatedAllocateInfoTensorARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
} VkMemoryDedicatedAllocateInfoTensorARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is a handle of a tensor which this memory will be bound to.

Valid Usage

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-allocationSize-09710) VUID-VkMemoryDedicatedAllocateInfoTensorARM-allocationSize-09710

`VkMemoryAllocateInfo`::`allocationSize` **must** equal the
`VkMemoryRequirements`::`size` of the tensor

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-09859) VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-09859

If [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation with
handle type [VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), the
memory being imported **must** also be a dedicated tensor allocation and
`tensor` **must** be identical to the tensor associated with the
imported memory

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-sType-sType) VUID-VkMemoryDedicatedAllocateInfoTensorARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_DEDICATED_ALLOCATE_INFO_TENSOR_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-parameter) VUID-VkMemoryDedicatedAllocateInfoTensorARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](resources.html#VkTensorARM) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

If the `pNext` chain includes a
`VkDedicatedAllocationMemoryAllocateInfoNV` structure, then that
structure includes a handle of the sole buffer or image resource that the
memory **can** be bound to.

The `VkDedicatedAllocationMemoryAllocateInfoNV` structure is defined as:

// Provided by VK_NV_dedicated_allocation
typedef struct VkDedicatedAllocationMemoryAllocateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    VkBuffer           buffer;
} VkDedicatedAllocationMemoryAllocateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a handle of an image which this
memory will be bound to.

* 
`buffer` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a handle of a buffer which this
memory will be bound to.

Valid Usage

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00649) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00649

At least one of `image` and `buffer` **must** be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00650) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00650

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the image **must** have been
created with
[VkDedicatedAllocationImageCreateInfoNV](resources.html#VkDedicatedAllocationImageCreateInfoNV)::`dedicatedAllocation`
equal to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00651) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00651

If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the buffer **must** have been
created with
[VkDedicatedAllocationBufferCreateInfoNV](resources.html#VkDedicatedAllocationBufferCreateInfoNV)::`dedicatedAllocation`
equal to [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00652) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00652

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`VkMemoryAllocateInfo`::`allocationSize` **must** equal the
`VkMemoryRequirements`::`size` of the image

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00653) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00653

If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
`VkMemoryAllocateInfo`::`allocationSize` **must** equal the
`VkMemoryRequirements`::`size` of the buffer

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00654) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-00654

If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation, the memory
being imported **must** also be a dedicated image allocation and
`image` **must** be identical to the image associated with the imported
memory

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00655) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-00655

If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) defines a memory import operation, the memory
being imported **must** also be a dedicated buffer allocation and
`buffer` **must** be identical to the buffer associated with the
imported memory

Valid Usage (Implicit)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-sType-sType) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEDICATED_ALLOCATION_MEMORY_ALLOCATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-parameter) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-image-parameter

 If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-parameter) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-VkDedicatedAllocationMemoryAllocateInfoNV-commonparent) VUID-VkDedicatedAllocationMemoryAllocateInfoNV-commonparent

 Both of `buffer`, and `image` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

If the `pNext` chain includes a `VkMemoryPriorityAllocateInfoEXT`
structure, then that structure includes a priority for the memory.

The `VkMemoryPriorityAllocateInfoEXT` structure is defined as:

// Provided by VK_EXT_memory_priority
typedef struct VkMemoryPriorityAllocateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    float              priority;
} VkMemoryPriorityAllocateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`priority` is a floating-point value between `0` and `1`, indicating
the priority of the allocation relative to other memory allocations.
Larger values are higher priority.
The granularity of the priorities is implementation-dependent.

Memory allocations with higher priority **may** be more likely to stay in
device-local memory when the system is under memory pressure.

If this structure is not included, it is as if the `priority` value were
`0.5`.

Valid Usage

* 
[](#VUID-VkMemoryPriorityAllocateInfoEXT-priority-02602) VUID-VkMemoryPriorityAllocateInfoEXT-priority-02602

`priority` **must** be between `0` and `1`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryPriorityAllocateInfoEXT-sType-sType) VUID-VkMemoryPriorityAllocateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_PRIORITY_ALLOCATE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To modify the priority of an existing memory allocation, call:

// Provided by VK_EXT_pageable_device_local_memory
void vkSetDeviceMemoryPriorityEXT(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    float                                       priority);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](#VkDeviceMemory) object to which the new
priority will be applied.

* 
`priority` is a floating-point value between `0` and `1`, indicating
the priority of the allocation relative to other memory allocations.
Larger values are higher priority.
The granularity of the priorities is implementation-dependent.

Memory allocations with higher priority **may** be more likely to stay in
device-local memory when the system is under memory pressure.

Valid Usage

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-priority-06258) VUID-vkSetDeviceMemoryPriorityEXT-priority-06258

`priority` **must** be between `0` and `1`, inclusive

Valid Usage (Implicit)

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-device-parameter) VUID-vkSetDeviceMemoryPriorityEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-memory-parameter) VUID-vkSetDeviceMemoryPriorityEXT-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-vkSetDeviceMemoryPriorityEXT-memory-parent) VUID-vkSetDeviceMemoryPriorityEXT-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

When allocating memory whose payload **may** be exported to another process or
Vulkan instance, add a [VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo) structure to the
`pNext` chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure, specifying
the handle types that **may** be exported.

The [VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo) structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkExportMemoryAllocateInfo {
    VkStructureType                    sType;
    const void*                        pNext;
    VkExternalMemoryHandleTypeFlags    handleTypes;
} VkExportMemoryAllocateInfo;

// Provided by VK_KHR_external_memory
// Equivalent to VkExportMemoryAllocateInfo
typedef VkExportMemoryAllocateInfo VkExportMemoryAllocateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is zero or a bitmask of
[VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) specifying one or more memory
handle types the application **can** export from the resulting allocation.
The application **can** request multiple handle types for the same
allocation.

Valid Usage

* 
[](#VUID-VkExportMemoryAllocateInfo-handleTypes-09860) VUID-VkExportMemoryAllocateInfo-handleTypes-09860

    The bits in `handleTypes` **must** be supported and compatible, as
    reported by
[VkExternalTensorPropertiesARM](capabilities.html#VkExternalTensorPropertiesARM),
    [VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties), or
    [VkExternalBufferProperties](capabilities.html#VkExternalBufferProperties)

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryAllocateInfo-sType-sType) VUID-VkExportMemoryAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMemoryAllocateInfo-handleTypes-parameter) VUID-VkExportMemoryAllocateInfo-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

When allocating memory that **may** be exported to another process or Vulkan
instance, add a [VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV) structure to the
`pNext` chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure, specifying
the handle types that **may** be exported.

The [VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV) structure is defined as:

// Provided by VK_NV_external_memory
typedef struct VkExportMemoryAllocateInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExternalMemoryHandleTypeFlagsNV    handleTypes;
} VkExportMemoryAllocateInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleTypes` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](#VkExternalMemoryHandleTypeFlagBitsNV) specifying one or more memory
handle types that **may** be exported.
Multiple handle types **may** be requested for the same allocation as long
as they are compatible, as reported by
[vkGetPhysicalDeviceExternalImageFormatPropertiesNV](capabilities.html#vkGetPhysicalDeviceExternalImageFormatPropertiesNV).

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryAllocateInfoNV-sType-sType) VUID-VkExportMemoryAllocateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_ALLOCATE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMemoryAllocateInfoNV-handleTypes-parameter) VUID-VkExportMemoryAllocateInfoNV-handleTypes-parameter

 `handleTypes` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](#VkExternalMemoryHandleTypeFlagBitsNV) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To specify additional attributes of NT handles exported from a memory
object, add a [VkExportMemoryWin32HandleInfoKHR](#VkExportMemoryWin32HandleInfoKHR) structure to the
`pNext` chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.
The `VkExportMemoryWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_win32
typedef struct VkExportMemoryWin32HandleInfoKHR {
    VkStructureType               sType;
    const void*                   pNext;
    const SECURITY_ATTRIBUTES*    pAttributes;
    DWORD                         dwAccess;
    LPCWSTR                       name;
} VkExportMemoryWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pAttributes` is a pointer to a Windows `SECURITY_ATTRIBUTES`
structure specifying security attributes of the handle.

* 
`dwAccess` is a `DWORD` specifying access rights of the handle.

* 
`name` is a null-terminated UTF-16 string to associate with the
payload referenced by NT handles exported from the created memory.

If [VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo) is not included in the same `pNext`
chain, this structure is ignored.

If [VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo) is included in the `pNext` chain of
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) with a Windows `handleType`, but either
`VkExportMemoryWin32HandleInfoKHR` is not included in the `pNext`
chain, or it is included but `pAttributes` is set to `NULL`, default
security descriptor values will be used, and child processes created by the
application will not inherit the handle, as described in the MSDN
documentation for “Synchronization Object Security and Access Rights”1.
Further, if the structure is not present, the access rights used depend on
the handle type.

For handles of the following types:

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

The implementation **must** ensure the access rights allow read and write
access to the memory.

1

[https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights](https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights)

Valid Usage

* 
[](#VUID-VkExportMemoryWin32HandleInfoKHR-handleTypes-00657) VUID-VkExportMemoryWin32HandleInfoKHR-handleTypes-00657

If [VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)::`handleTypes` does not include
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), a
`VkExportMemoryWin32HandleInfoKHR` structure **must** not be included
in the `pNext` chain of [VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryWin32HandleInfoKHR-sType-sType) VUID-VkExportMemoryWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMemoryWin32HandleInfoKHR-pAttributes-parameter) VUID-VkExportMemoryWin32HandleInfoKHR-pAttributes-parameter

 If `pAttributes` is not `NULL`, `pAttributes` **must** be a valid pointer to a valid `SECURITY_ATTRIBUTES` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To import memory from a Windows handle, add a
[VkImportMemoryWin32HandleInfoKHR](#VkImportMemoryWin32HandleInfoKHR) structure to the `pNext` chain of
the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.

The `VkImportMemoryWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_win32
typedef struct VkImportMemoryWin32HandleInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    HANDLE                                handle;
    LPCWSTR                               name;
} VkImportMemoryWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of `handle` or `name`.

* 
`handle` is `NULL` or the external handle to import.

* 
`name` is `NULL` or a null-terminated UTF-16 string naming the
payload to import.

Importing memory object payloads from Windows handles does not transfer
ownership of the handle to the Vulkan implementation.
For handle types defined as NT handles, the application **must** release handle
ownership using the `CloseHandle` system call when the handle is no
longer needed.
For handle types defined as NT handles, the imported memory object holds a
reference to its payload.

|  | Non-NT handle import operations do not add a reference to their associated
| --- | --- |
payload.
If the original object owning the payload is destroyed, all resources and
handles sharing that payload will become invalid. |

Applications **can** import the same payload into multiple instances of Vulkan,
into the same instance from which it was exported, and multiple times into a
given Vulkan instance.
In all cases, each import operation **must** create a distinct
`VkDeviceMemory` object.

Valid Usage

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handleType-09861) VUID-VkImportMemoryWin32HandleInfoKHR-handleType-09861

    If `handleType` is not `0`, it **must** be supported for import, as
    reported by
[VkExternalTensorPropertiesARM](capabilities.html#VkExternalTensorPropertiesARM),
    [VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties), or
    [VkExternalBufferProperties](capabilities.html#VkExternalBufferProperties)

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handle-00659) VUID-VkImportMemoryWin32HandleInfoKHR-handle-00659

The memory from which `handle` was exported, or the memory named by
`name` **must** have been created on the same underlying physical
device as `device`

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handleType-00660) VUID-VkImportMemoryWin32HandleInfoKHR-handleType-00660

If `handleType` is not `0`, it **must** be defined as an NT handle or a
global share handle

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handleType-01439) VUID-VkImportMemoryWin32HandleInfoKHR-handleType-01439

If `handleType` is not
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_TEXTURE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_HEAP_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D12_RESOURCE_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR), `name`
**must** be `NULL`

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handleType-01440) VUID-VkImportMemoryWin32HandleInfoKHR-handleType-01440

If `handleType` is not `0` and `handle` is `NULL`, `name`
**must** name a valid memory resource of the type specified by
`handleType`

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handleType-00661) VUID-VkImportMemoryWin32HandleInfoKHR-handleType-00661

If `handleType` is not `0` and `name` is `NULL`, `handle`
**must** be a valid handle of the type specified by `handleType`

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handle-01441) VUID-VkImportMemoryWin32HandleInfoKHR-handle-01441

If `handle` is not `NULL`, `name` **must** be `NULL`

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handle-01518) VUID-VkImportMemoryWin32HandleInfoKHR-handle-01518

If `handle` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external memory handle types compatibility](capabilities.html#external-memory-handle-types-compatibility)

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-name-01519) VUID-VkImportMemoryWin32HandleInfoKHR-name-01519

If `name` is not `NULL`, it **must** obey any requirements listed for
`handleType` in [    external memory handle types compatibility](capabilities.html#external-memory-handle-types-compatibility)

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-sType-sType) VUID-VkImportMemoryWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMemoryWin32HandleInfoKHR-handleType-parameter) VUID-VkImportMemoryWin32HandleInfoKHR-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To export a Windows handle representing the payload of a Vulkan device
memory object, call:

// Provided by VK_KHR_external_memory_win32
VkResult vkGetMemoryWin32HandleKHR(
    VkDevice                                    device,
    const VkMemoryGetWin32HandleInfoKHR*        pGetWin32HandleInfo,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pGetWin32HandleInfo` is a pointer to a
[VkMemoryGetWin32HandleInfoKHR](#VkMemoryGetWin32HandleInfoKHR) structure containing parameters of
the export operation.

* 
`pHandle` will return the Windows handle representing the payload of
the device memory object.

For handle types defined as NT handles, the handles returned by
`vkGetMemoryWin32HandleKHR` are owned by the application and hold a
reference to their payload.
To avoid leaking resources, the application **must** release ownership of them
using the `CloseHandle` system call when they are no longer needed.

|  | Non-NT handle types do not add a reference to their associated payload.
| --- | --- |
If the original object owning the payload is destroyed, all resources and
handles sharing that payload will become invalid. |

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryWin32HandleKHR-device-parameter) VUID-vkGetMemoryWin32HandleKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryWin32HandleKHR-pGetWin32HandleInfo-parameter) VUID-vkGetMemoryWin32HandleKHR-pGetWin32HandleInfo-parameter

 `pGetWin32HandleInfo` **must** be a valid pointer to a valid [VkMemoryGetWin32HandleInfoKHR](#VkMemoryGetWin32HandleInfoKHR) structure

* 
[](#VUID-vkGetMemoryWin32HandleKHR-pHandle-parameter) VUID-vkGetMemoryWin32HandleKHR-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `HANDLE` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryGetWin32HandleInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_win32
typedef struct VkMemoryGetWin32HandleInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetWin32HandleInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the handle will be
exported.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) for a description of the
properties of the defined external memory handle types.

Valid Usage

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00662) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00662

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00663) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00663

If `handleType` is defined as an NT handle,
[vkGetMemoryWin32HandleKHR](#vkGetMemoryWin32HandleKHR) **must** be called no more than once for
each valid unique combination of `memory` and `handleType`

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00664) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-00664

`handleType` **must** be defined as an NT handle or a global share
handle

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-sType-sType) VUID-VkMemoryGetWin32HandleInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_WIN32_HANDLE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-pNext-pNext) VUID-VkMemoryGetWin32HandleInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-memory-parameter) VUID-VkMemoryGetWin32HandleInfoKHR-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-VkMemoryGetWin32HandleInfoKHR-handleType-parameter) VUID-VkMemoryGetWin32HandleInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

Windows memory handles compatible with Vulkan **may** also be created by
non-Vulkan APIs using methods beyond the scope of this specification.
To determine the correct parameters to use when importing such handles,
call:

// Provided by VK_KHR_external_memory_win32
VkResult vkGetMemoryWin32HandlePropertiesKHR(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    HANDLE                                      handle,
    VkMemoryWin32HandlePropertiesKHR*           pMemoryWin32HandleProperties);

* 
`device` is the logical device that will be importing `handle`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of the handle `handle`.

* 
`handle` is the handle which will be imported.

* 
`pMemoryWin32HandleProperties` is a pointer to a
[VkMemoryWin32HandlePropertiesKHR](#VkMemoryWin32HandlePropertiesKHR) structure in which properties of
`handle` are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-handle-00665) VUID-vkGetMemoryWin32HandlePropertiesKHR-handle-00665

`handle` **must** point to a valid Windows memory handle

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-00666) VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-00666

`handleType` **must** not be one of the handle types defined as opaque

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-device-parameter) VUID-vkGetMemoryWin32HandlePropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-parameter) VUID-vkGetMemoryWin32HandlePropertiesKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

* 
[](#VUID-vkGetMemoryWin32HandlePropertiesKHR-pMemoryWin32HandleProperties-parameter) VUID-vkGetMemoryWin32HandlePropertiesKHR-pMemoryWin32HandleProperties-parameter

 `pMemoryWin32HandleProperties` **must** be a valid pointer to a [VkMemoryWin32HandlePropertiesKHR](#VkMemoryWin32HandlePropertiesKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryWin32HandlePropertiesKHR` structure returned is defined as:

// Provided by VK_KHR_external_memory_win32
typedef struct VkMemoryWin32HandlePropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryWin32HandlePropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified windows handle **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryWin32HandlePropertiesKHR-sType-sType) VUID-VkMemoryWin32HandlePropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_WIN32_HANDLE_PROPERTIES_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryWin32HandlePropertiesKHR-pNext-pNext) VUID-VkMemoryWin32HandlePropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

When [VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV)::`handleTypes` includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsNV), add a
`VkExportMemoryWin32HandleInfoNV` structure to the `pNext` chain of
the [VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV) structure to specify security
attributes and access rights for the memory object’s external handle.

The `VkExportMemoryWin32HandleInfoNV` structure is defined as:

// Provided by VK_NV_external_memory_win32
typedef struct VkExportMemoryWin32HandleInfoNV {
    VkStructureType               sType;
    const void*                   pNext;
    const SECURITY_ATTRIBUTES*    pAttributes;
    DWORD                         dwAccess;
} VkExportMemoryWin32HandleInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pAttributes` is a pointer to a Windows `SECURITY_ATTRIBUTES`
structure specifying security attributes of the handle.

* 
`dwAccess` is a `DWORD` specifying access rights of the handle.

If this structure is not present, or if `pAttributes` is `NULL`, default
security descriptor values will be used, and child processes created by the
application will not inherit the handle, as described in the MSDN
documentation for “Synchronization Object Security and Access Rights”1.
Further, if the structure is not present, the access rights will be

`DXGI_SHARED_RESOURCE_READ` | `DXGI_SHARED_RESOURCE_WRITE`

1

[https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights](https://docs.microsoft.com/en-us/windows/win32/sync/synchronization-object-security-and-access-rights)

Valid Usage (Implicit)

* 
[](#VUID-VkExportMemoryWin32HandleInfoNV-sType-sType) VUID-VkExportMemoryWin32HandleInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_MEMORY_WIN32_HANDLE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMemoryWin32HandleInfoNV-pAttributes-parameter) VUID-VkExportMemoryWin32HandleInfoNV-pAttributes-parameter

 If `pAttributes` is not `NULL`, `pAttributes` **must** be a valid pointer to a valid `SECURITY_ATTRIBUTES` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To import memory created on the same physical device but outside of the
current Vulkan instance, add a [VkImportMemoryWin32HandleInfoNV](#VkImportMemoryWin32HandleInfoNV)
structure to the `pNext` chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo)
structure, specifying a handle to and the type of the memory.

The `VkImportMemoryWin32HandleInfoNV` structure is defined as:

// Provided by VK_NV_external_memory_win32
typedef struct VkImportMemoryWin32HandleInfoNV {
    VkStructureType                      sType;
    const void*                          pNext;
    VkExternalMemoryHandleTypeFlagsNV    handleType;
    HANDLE                               handle;
} VkImportMemoryWin32HandleInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is `0` or a [VkExternalMemoryHandleTypeFlagBitsNV](#VkExternalMemoryHandleTypeFlagBitsNV)
value specifying the type of memory handle in `handle`.

* 
`handle` is a Windows `HANDLE` referring to the memory.

If `handleType` is `0`, this structure is ignored by consumers of the
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure it is chained from.

Valid Usage

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-handleType-01327) VUID-VkImportMemoryWin32HandleInfoNV-handleType-01327

`handleType` **must** not have more than one bit set

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-handle-01328) VUID-VkImportMemoryWin32HandleInfoNV-handle-01328

`handle` **must** be a valid handle to memory, obtained as specified by
`handleType`

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-sType-sType) VUID-VkImportMemoryWin32HandleInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_WIN32_HANDLE_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMemoryWin32HandleInfoNV-handleType-parameter) VUID-VkImportMemoryWin32HandleInfoNV-handleType-parameter

 `handleType` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](#VkExternalMemoryHandleTypeFlagBitsNV) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

Bits which **can** be set in `handleType` are:

Possible values of [VkImportMemoryWin32HandleInfoNV](#VkImportMemoryWin32HandleInfoNV)::`handleType`,
specifying the type of an external memory handle, are:

// Provided by VK_NV_external_memory_capabilities
typedef enum VkExternalMemoryHandleTypeFlagBitsNV {
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV = 0x00000001,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_NV = 0x00000002,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_BIT_NV = 0x00000004,
    VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_KMT_BIT_NV = 0x00000008,
} VkExternalMemoryHandleTypeFlagBitsNV;

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsNV) specifies a
handle to memory returned by [vkGetMemoryWin32HandleNV](#vkGetMemoryWin32HandleNV).

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsNV) specifies a
handle to memory returned by [vkGetMemoryWin32HandleNV](#vkGetMemoryWin32HandleNV), or one
duplicated from such a handle using `DuplicateHandle()`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsNV) specifies a
valid NT handle to memory returned by
`IDXGIResource1::CreateSharedHandle`, or a handle duplicated from such a
handle using `DuplicateHandle()`.

* 
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_D3D11_IMAGE_KMT_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsNV) specifies a
handle to memory returned by `IDXGIResource::GetSharedHandle()`.

// Provided by VK_NV_external_memory_capabilities
typedef VkFlags VkExternalMemoryHandleTypeFlagsNV;

`VkExternalMemoryHandleTypeFlagsNV` is a bitmask type for setting a mask
of zero or more [VkExternalMemoryHandleTypeFlagBitsNV](#VkExternalMemoryHandleTypeFlagBitsNV).

To retrieve the handle corresponding to a device memory object created with
[VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV)::`handleTypes` set to include
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsNV) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_WIN32_KMT_BIT_NV](#VkExternalMemoryHandleTypeFlagBitsNV), call:

// Provided by VK_NV_external_memory_win32
VkResult vkGetMemoryWin32HandleNV(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    VkExternalMemoryHandleTypeFlagsNV           handleType,
    HANDLE*                                     pHandle);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](#VkDeviceMemory) object.

* 
`handleType` is a bitmask of
[VkExternalMemoryHandleTypeFlagBitsNV](#VkExternalMemoryHandleTypeFlagBitsNV) containing a single bit
specifying the type of handle requested.

* 
`pHandle` is a pointer to a Windows `HANDLE` in which the handle
is returned.

Valid Usage

* 
[](#VUID-vkGetMemoryWin32HandleNV-handleType-01326) VUID-vkGetMemoryWin32HandleNV-handleType-01326

`handleType` **must** be a flag specified in
[VkExportMemoryAllocateInfoNV](#VkExportMemoryAllocateInfoNV)::`handleTypes` when allocating
`memory`

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryWin32HandleNV-device-parameter) VUID-vkGetMemoryWin32HandleNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryWin32HandleNV-memory-parameter) VUID-vkGetMemoryWin32HandleNV-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-vkGetMemoryWin32HandleNV-handleType-parameter) VUID-vkGetMemoryWin32HandleNV-handleType-parameter

 `handleType` **must** be a valid combination of [VkExternalMemoryHandleTypeFlagBitsNV](#VkExternalMemoryHandleTypeFlagBitsNV) values

* 
[](#VUID-vkGetMemoryWin32HandleNV-handleType-requiredbitmask) VUID-vkGetMemoryWin32HandleNV-handleType-requiredbitmask

 `handleType` **must** not be `0`

* 
[](#VUID-vkGetMemoryWin32HandleNV-pHandle-parameter) VUID-vkGetMemoryWin32HandleNV-pHandle-parameter

 `pHandle` **must** be a valid pointer to a `HANDLE` value

* 
[](#VUID-vkGetMemoryWin32HandleNV-memory-parent) VUID-vkGetMemoryWin32HandleNV-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To import memory from a POSIX file descriptor handle, add a
[VkImportMemoryFdInfoKHR](#VkImportMemoryFdInfoKHR) structure to the `pNext` chain of the
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.
The `VkImportMemoryFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_fd
typedef struct VkImportMemoryFdInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    int                                   fd;
} VkImportMemoryFdInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the handle type of `fd`.

* 
`fd` is the external handle to import.

Importing memory from a file descriptor transfers ownership of the file
descriptor from the application to the Vulkan implementation.
The application **must** not perform any operations on the file descriptor
after a successful import.
The imported memory object holds a reference to its payload.

Applications **can** import the same payload into multiple instances of Vulkan,
into the same instance from which it was exported, and multiple times into a
given Vulkan instance.
In all cases, each import operation **must** create a distinct
`VkDeviceMemory` object.

Valid Usage

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-09862) VUID-VkImportMemoryFdInfoKHR-handleType-09862

    If `handleType` is not `0`, it **must** be supported for import, as
    reported by
[VkExternalTensorPropertiesARM](capabilities.html#VkExternalTensorPropertiesARM),
    [VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties) or
    [VkExternalBufferProperties](capabilities.html#VkExternalBufferProperties)

* 
[](#VUID-VkImportMemoryFdInfoKHR-fd-00668) VUID-VkImportMemoryFdInfoKHR-fd-00668

The memory from which `fd` was exported **must** have been created on
the same underlying physical device as `device`

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-00669) VUID-VkImportMemoryFdInfoKHR-handleType-00669

If `handleType` is not `0`, it **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-00670) VUID-VkImportMemoryFdInfoKHR-handleType-00670

If `handleType` is not `0`, `fd` **must** be a valid handle of the
type specified by `handleType`

* 
[](#VUID-VkImportMemoryFdInfoKHR-fd-01746) VUID-VkImportMemoryFdInfoKHR-fd-01746

The memory represented by `fd` **must** have been created from a
physical device and driver that is compatible with `device` and
`handleType`, as described in
[external memory handle    types compatibility](capabilities.html#external-memory-handle-types-compatibility)

* 
[](#VUID-VkImportMemoryFdInfoKHR-fd-01520) VUID-VkImportMemoryFdInfoKHR-fd-01520

`fd` **must** obey any requirements listed for `handleType` in
[external memory handle    types compatibility](capabilities.html#external-memory-handle-types-compatibility)

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryFdInfoKHR-sType-sType) VUID-VkImportMemoryFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_FD_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMemoryFdInfoKHR-handleType-parameter) VUID-VkImportMemoryFdInfoKHR-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To export a POSIX file descriptor referencing the payload of a Vulkan device
memory object, call:

// Provided by VK_KHR_external_memory_fd
VkResult vkGetMemoryFdKHR(
    VkDevice                                    device,
    const VkMemoryGetFdInfoKHR*                 pGetFdInfo,
    int*                                        pFd);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pGetFdInfo` is a pointer to a [VkMemoryGetFdInfoKHR](#VkMemoryGetFdInfoKHR) structure
containing parameters of the export operation.

* 
`pFd` will return a file descriptor referencing the payload of the
device memory object.

Each call to `vkGetMemoryFdKHR` **must** create a new file descriptor
holding a reference to the memory object’s payload and transfer ownership of
the file descriptor to the application.
To avoid leaking resources, the application **must** release ownership of the
file descriptor using the `close` system call when it is no longer
needed, or by importing a Vulkan memory object from it.
Where supported by the operating system, the implementation **must** set the
file descriptor to be closed automatically when an `execve` system call
is made.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryFdKHR-device-parameter) VUID-vkGetMemoryFdKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryFdKHR-pGetFdInfo-parameter) VUID-vkGetMemoryFdKHR-pGetFdInfo-parameter

 `pGetFdInfo` **must** be a valid pointer to a valid [VkMemoryGetFdInfoKHR](#VkMemoryGetFdInfoKHR) structure

* 
[](#VUID-vkGetMemoryFdKHR-pFd-parameter) VUID-vkGetMemoryFdKHR-pFd-parameter

 `pFd` **must** be a valid pointer to an `int` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryGetFdInfoKHR` structure is defined as:

// Provided by VK_KHR_external_memory_fd
typedef struct VkMemoryGetFdInfoKHR {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetFdInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the handle will be
exported.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the file descriptor exported depend on the value of
`handleType`.
See [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) for a description of the
properties of the defined external memory handle types.

|  | The size of the exported file **may** be larger than the size requested by
| --- | --- |
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)::`allocationSize`.
If `handleType` is [VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
then the application **can** query the file’s actual size with
[`lseek`](https://man7.org/linux/man-pages/man2/lseek.2.html). |

Valid Usage

* 
[](#VUID-VkMemoryGetFdInfoKHR-handleType-00671) VUID-VkMemoryGetFdInfoKHR-handleType-00671

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetFdInfoKHR-handleType-00672) VUID-VkMemoryGetFdInfoKHR-handleType-00672

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_DMA_BUF_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetFdInfoKHR-sType-sType) VUID-VkMemoryGetFdInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_FD_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryGetFdInfoKHR-pNext-pNext) VUID-VkMemoryGetFdInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetFdInfoKHR-memory-parameter) VUID-VkMemoryGetFdInfoKHR-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-VkMemoryGetFdInfoKHR-handleType-parameter) VUID-VkMemoryGetFdInfoKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

POSIX file descriptor memory handles compatible with Vulkan **may** also be
created by non-Vulkan APIs using methods beyond the scope of this
specification.
To determine the correct parameters to use when importing such handles,
call:

// Provided by VK_KHR_external_memory_fd
VkResult vkGetMemoryFdPropertiesKHR(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    int                                         fd,
    VkMemoryFdPropertiesKHR*                    pMemoryFdProperties);

* 
`device` is the logical device that will be importing `fd`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of the handle `fd`.

* 
`fd` is the handle which will be imported.

* 
`pMemoryFdProperties` is a pointer to a
[VkMemoryFdPropertiesKHR](#VkMemoryFdPropertiesKHR) structure in which the properties of the
handle `fd` are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-fd-00673) VUID-vkGetMemoryFdPropertiesKHR-fd-00673

`fd` **must** point to a valid POSIX file descriptor memory handle

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-handleType-00674) VUID-vkGetMemoryFdPropertiesKHR-handleType-00674

`handleType` **must** not be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_OPAQUE_FD_BIT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-device-parameter) VUID-vkGetMemoryFdPropertiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-handleType-parameter) VUID-vkGetMemoryFdPropertiesKHR-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

* 
[](#VUID-vkGetMemoryFdPropertiesKHR-pMemoryFdProperties-parameter) VUID-vkGetMemoryFdPropertiesKHR-pMemoryFdProperties-parameter

 `pMemoryFdProperties` **must** be a valid pointer to a [VkMemoryFdPropertiesKHR](#VkMemoryFdPropertiesKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryFdPropertiesKHR` structure returned is defined as:

// Provided by VK_KHR_external_memory_fd
typedef struct VkMemoryFdPropertiesKHR {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryFdPropertiesKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified file descriptor **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryFdPropertiesKHR-sType-sType) VUID-VkMemoryFdPropertiesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_FD_PROPERTIES_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryFdPropertiesKHR-pNext-pNext) VUID-VkMemoryFdPropertiesKHR-pNext-pNext

 `pNext` **must** be `NULL`

To import memory from a host pointer, add a
[VkImportMemoryHostPointerInfoEXT](#VkImportMemoryHostPointerInfoEXT) structure to the `pNext` chain of
the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.
The `VkImportMemoryHostPointerInfoEXT` structure is defined as:

// Provided by VK_EXT_external_memory_host
typedef struct VkImportMemoryHostPointerInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    void*                                 pHostPointer;
} VkImportMemoryHostPointerInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the handle type.

* 
`pHostPointer` is the host pointer to import from.

Importing memory from a host pointer shares ownership of the memory between
the host and the Vulkan implementation.
The application **can** continue to access the memory through the host pointer
but it is the application’s responsibility to synchronize device and
non-device access to the payload as defined in
[Host Access to Device Memory Objects](#memory-device-hostaccess).

Applications **can** import the same payload into multiple instances of Vulkan
and multiple times into a given Vulkan instance.
However, implementations **may** fail to import the same payload multiple times
into a given physical device due to platform constraints.

Importing memory from a particular host pointer **may** not be possible due to
additional platform-specific restrictions beyond the scope of this
specification in which case the implementation **must** fail the memory import
operation with the error code [VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR](fundamentals.html#VkResult).

Whether device memory objects imported from a host pointer hold a reference
to their payload is **undefined**.
As such, the application **must** ensure that the imported memory range remains
valid and accessible for the lifetime of the imported memory object.

Implementations **may** support importing host pointers for memory types which
are not host-visible.
In this case, after a successful call to [vkAllocateMemory](#vkAllocateMemory), the memory
range imported from `pHostPointer` **must** not be accessed by the
application until the [VkDeviceMemory](#VkDeviceMemory) has been destroyed.
Memory contents for the host memory becomes **undefined** on import, and is
left **undefined** after the [VkDeviceMemory](#VkDeviceMemory) has been destroyed.
Applications **must** also not access host memory which is mapped to the same
physical memory as `pHostPointer`, but mapped to a different host
pointer while the [VkDeviceMemory](#VkDeviceMemory) handle is valid.
Implementations running on general-purpose operating systems **should** not
support importing host pointers for memory types which are not host-visible.

|  | Using host pointers to back non-host visible allocations is a
| --- | --- |
platform-specific use case, and applications should not attempt to do this
unless instructed by the platform. |

Valid Usage

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01747) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01747

If `handleType` is not `0`, it **must** be supported for import, as
reported in [VkExternalMemoryProperties](capabilities.html#VkExternalMemoryProperties)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01748) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01748

If `handleType` is not `0`, it **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-01749) VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-01749

`pHostPointer` **must** be a pointer aligned to an integer multiple of
`VkPhysicalDeviceExternalMemoryHostPropertiesEXT`::`minImportedHostPointerAlignment`

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01750) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01750

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`pHostPointer` **must** be a pointer to `allocationSize` number of
bytes of host memory, where `allocationSize` is the member of the
`VkMemoryAllocateInfo` structure this structure is chained to

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-01751) VUID-VkImportMemoryHostPointerInfoEXT-handleType-01751

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`pHostPointer` **must** be a pointer to `allocationSize` number of
bytes of host mapped foreign memory, where `allocationSize` is the
member of the `VkMemoryAllocateInfo` structure this structure is
chained to

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-sType-sType) VUID-VkImportMemoryHostPointerInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_HOST_POINTER_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-handleType-parameter) VUID-VkImportMemoryHostPointerInfoEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

* 
[](#VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-parameter) VUID-VkImportMemoryHostPointerInfoEXT-pHostPointer-parameter

 `pHostPointer` **must** be a pointer value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To determine the correct parameters to use when importing host pointers,
call:

// Provided by VK_EXT_external_memory_host
VkResult vkGetMemoryHostPointerPropertiesEXT(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    const void*                                 pHostPointer,
    VkMemoryHostPointerPropertiesEXT*           pMemoryHostPointerProperties);

* 
`device` is the logical device that will be importing
`pHostPointer`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of the handle `pHostPointer`.

* 
`pHostPointer` is the host pointer to import from.

* 
`pMemoryHostPointerProperties` is a pointer to a
[VkMemoryHostPointerPropertiesEXT](#VkMemoryHostPointerPropertiesEXT) structure in which the host
pointer properties are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01752) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01752

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-01753) VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-01753

`pHostPointer` **must** be a pointer aligned to an integer multiple of
`VkPhysicalDeviceExternalMemoryHostPropertiesEXT`::`minImportedHostPointerAlignment`

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01754) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01754

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`pHostPointer` **must** be a pointer to host memory

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01755) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-01755

If `handleType` is
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
`pHostPointer` **must** be a pointer to host mapped foreign memory

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-device-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-pHostPointer-parameter

 `pHostPointer` **must** be a pointer value

* 
[](#VUID-vkGetMemoryHostPointerPropertiesEXT-pMemoryHostPointerProperties-parameter) VUID-vkGetMemoryHostPointerPropertiesEXT-pMemoryHostPointerProperties-parameter

 `pMemoryHostPointerProperties` **must** be a valid pointer to a [VkMemoryHostPointerPropertiesEXT](#VkMemoryHostPointerPropertiesEXT) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryHostPointerPropertiesEXT` structure is defined as:

// Provided by VK_EXT_external_memory_host
typedef struct VkMemoryHostPointerPropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryHostPointerPropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified host pointer **can** be imported as.

The value returned by `memoryTypeBits` **should** only include bits that
identify memory types which are host visible.
Implementations **may** include bits that identify memory types which are not
host visible.
Behavior for imported pointers of such types is defined by
[](#host-memory-import-non-visible-type)[VkImportMemoryHostPointerInfoEXT](#VkImportMemoryHostPointerInfoEXT).

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryHostPointerPropertiesEXT-sType-sType) VUID-VkMemoryHostPointerPropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_HOST_POINTER_PROPERTIES_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryHostPointerPropertiesEXT-pNext-pNext) VUID-VkMemoryHostPointerPropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

To import memory created outside of the current Vulkan instance from an
Android hardware buffer, add a
`VkImportAndroidHardwareBufferInfoANDROID` structure to the `pNext`
chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.
The `VkImportAndroidHardwareBufferInfoANDROID` structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkImportAndroidHardwareBufferInfoANDROID {
    VkStructureType            sType;
    const void*                pNext;
    struct AHardwareBuffer*    buffer;
} VkImportAndroidHardwareBufferInfoANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the Android hardware buffer to import.

If the [vkAllocateMemory](#vkAllocateMemory) command succeeds, the implementation **must**
acquire a reference to the imported hardware buffer, which it **must** release
when the device memory object is freed.
If the command fails, the implementation **must** not retain a reference.

Valid Usage

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-09863) VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-09863

    If `buffer` is not `NULL`, Android hardware buffers **must** be
    supported for import, as reported by
[VkExternalTensorPropertiesARM](capabilities.html#VkExternalTensorPropertiesARM),
    [VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties), or
    [VkExternalBufferProperties](capabilities.html#VkExternalBufferProperties)

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-01881) VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-01881

If `buffer` is not `NULL`, it **must** be a valid Android hardware
buffer object with `AHardwareBuffer_Desc`::`usage` compatible with
Vulkan as described in [Android    Hardware Buffers](#memory-external-android-hardware-buffer)

Valid Usage (Implicit)

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-sType-sType) VUID-VkImportAndroidHardwareBufferInfoANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_ANDROID_HARDWARE_BUFFER_INFO_ANDROID](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-parameter) VUID-VkImportAndroidHardwareBufferInfoANDROID-buffer-parameter

 `buffer` **must** be a valid pointer to an `AHardwareBuffer` value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To export an Android hardware buffer referencing the payload of a Vulkan
device memory object, call:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
VkResult vkGetMemoryAndroidHardwareBufferANDROID(
    VkDevice                                    device,
    const VkMemoryGetAndroidHardwareBufferInfoANDROID* pInfo,
    struct AHardwareBuffer**                    pBuffer);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pInfo` is a pointer to a
[VkMemoryGetAndroidHardwareBufferInfoANDROID](#VkMemoryGetAndroidHardwareBufferInfoANDROID) structure containing
parameters of the export operation.

* 
`pBuffer` will return an Android hardware buffer referencing the
payload of the device memory object.

Each call to `vkGetMemoryAndroidHardwareBufferANDROID` **must** return an
Android hardware buffer with a new reference acquired in addition to the
reference held by the [VkDeviceMemory](#VkDeviceMemory).
To avoid leaking resources, the application **must** release the reference by
calling `AHardwareBuffer_release` when it is no longer needed.
When called with the same handle in
[VkMemoryGetAndroidHardwareBufferInfoANDROID](#VkMemoryGetAndroidHardwareBufferInfoANDROID)::`memory`,
`vkGetMemoryAndroidHardwareBufferANDROID` **must** return the same Android
hardware buffer object.
If the device memory was created by importing an Android hardware buffer,
`vkGetMemoryAndroidHardwareBufferANDROID` **must** return that same Android
hardware buffer object.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryAndroidHardwareBufferANDROID-device-parameter) VUID-vkGetMemoryAndroidHardwareBufferANDROID-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryAndroidHardwareBufferANDROID-pInfo-parameter) VUID-vkGetMemoryAndroidHardwareBufferANDROID-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkMemoryGetAndroidHardwareBufferInfoANDROID](#VkMemoryGetAndroidHardwareBufferInfoANDROID) structure

* 
[](#VUID-vkGetMemoryAndroidHardwareBufferANDROID-pBuffer-parameter) VUID-vkGetMemoryAndroidHardwareBufferANDROID-pBuffer-parameter

 `pBuffer` **must** be a valid pointer to a valid pointer to an `AHardwareBuffer` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryGetAndroidHardwareBufferInfoANDROID` structure is defined
as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkMemoryGetAndroidHardwareBufferInfoANDROID {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkMemoryGetAndroidHardwareBufferInfoANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the Android hardware buffer
will be exported.

Valid Usage

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-handleTypes-01882) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-handleTypes-01882

[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)
**must** have been included in
[VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-01883) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-01883

If the `pNext` chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) used to
allocate `memory` included a [VkMemoryDedicatedAllocateInfo](#VkMemoryDedicatedAllocateInfo)
with non-`NULL` `image` member, then that `image` **must** already
be bound to `memory`

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-sType-sType) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_ANDROID_HARDWARE_BUFFER_INFO_ANDROID](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-pNext) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-memory-parameter) VUID-VkMemoryGetAndroidHardwareBufferInfoANDROID-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

To determine the memory parameters to use when importing an Android hardware
buffer, call:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
VkResult vkGetAndroidHardwareBufferPropertiesANDROID(
    VkDevice                                    device,
    const struct AHardwareBuffer*               buffer,
    VkAndroidHardwareBufferPropertiesANDROID*   pProperties);

* 
`device` is the logical device that will be importing `buffer`.

* 
`buffer` is the Android hardware buffer which will be imported.

* 
`pProperties` is a pointer to a
[VkAndroidHardwareBufferPropertiesANDROID](#VkAndroidHardwareBufferPropertiesANDROID) structure in which the
properties of `buffer` are returned.

Valid Usage

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-01884) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-01884

`buffer` **must** be a valid Android hardware buffer object with at
least one of the `AHARDWAREBUFFER_USAGE_GPU_*` flags in its
`AHardwareBuffer_Desc`::`usage`

Valid Usage (Implicit)

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-device-parameter) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-parameter) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-buffer-parameter

 `buffer` **must** be a valid pointer to a valid `AHardwareBuffer` value

* 
[](#VUID-vkGetAndroidHardwareBufferPropertiesANDROID-pProperties-parameter) VUID-vkGetAndroidHardwareBufferPropertiesANDROID-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkAndroidHardwareBufferPropertiesANDROID](#VkAndroidHardwareBufferPropertiesANDROID) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkAndroidHardwareBufferPropertiesANDROID` structure returned is
defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkAndroidHardwareBufferPropertiesANDROID {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeBits;
} VkAndroidHardwareBufferPropertiesANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the external memory

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Android hardware buffer **can** be imported
as.

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-sType) VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_PROPERTIES_ANDROID](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAndroidHardwareBufferPropertiesANDROID-pNext-pNext) VUID-VkAndroidHardwareBufferPropertiesANDROID-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAndroidHardwareBufferFormatProperties2ANDROID](#VkAndroidHardwareBufferFormatProperties2ANDROID), [VkAndroidHardwareBufferFormatPropertiesANDROID](#VkAndroidHardwareBufferFormatPropertiesANDROID), or [VkAndroidHardwareBufferFormatResolvePropertiesANDROID](#VkAndroidHardwareBufferFormatResolvePropertiesANDROID)

* 
[](#VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-unique) VUID-VkAndroidHardwareBufferPropertiesANDROID-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

To obtain format properties of an Android hardware buffer, include a
`VkAndroidHardwareBufferFormatPropertiesANDROID` structure in the
`pNext` chain of the [VkAndroidHardwareBufferPropertiesANDROID](#VkAndroidHardwareBufferPropertiesANDROID)
structure passed to [vkGetAndroidHardwareBufferPropertiesANDROID](#vkGetAndroidHardwareBufferPropertiesANDROID).
This structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkAndroidHardwareBufferFormatPropertiesANDROID {
    VkStructureType                  sType;
    void*                            pNext;
    VkFormat                         format;
    uint64_t                         externalFormat;
    VkFormatFeatureFlags             formatFeatures;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkAndroidHardwareBufferFormatPropertiesANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the Vulkan format corresponding to the Android hardware
buffer’s format, or [VK_FORMAT_UNDEFINED](formats.html#VkFormat) if there is not an
equivalent Vulkan format.

* 
`externalFormat` is an implementation-defined external format
identifier for use with [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID).
It **must** not be zero.

* 
`formatFeatures` describes the capabilities of this external format
when used with an image bound to memory imported from `buffer`.

* 
`samplerYcbcrConversionComponents` is the component swizzle that
**should** be used in [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYcbcrModel` is a suggested color model to use in the
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYcbcrRange` is a suggested numerical value range to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedXChromaOffset` is a suggested X chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYChromaOffset` is a suggested Y chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

If the Android hardware buffer has one of the formats listed in the
[Format Equivalence table](#memory-external-android-hardware-buffer-formats), then `format` **must** have the equivalent Vulkan format listed in
the table.
Otherwise, `format` **may** be [VK_FORMAT_UNDEFINED](formats.html#VkFormat), indicating the
Android hardware buffer **can** only be used with an external format.

The `formatFeatures` member **must** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits) and at least one of
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits) or
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits), and **should** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](formats.html#VkFormatFeatureFlagBits).

|  | The `formatFeatures` member only indicates the features available when
| --- | --- |
using an
[external-format image](#memory-external-android-hardware-buffer-external-formats) created from the Android hardware buffer.
Images from Android hardware buffers with a format other than
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) are subject to the format capabilities obtained
from [vkGetPhysicalDeviceFormatProperties2](formats.html#vkGetPhysicalDeviceFormatProperties2), and
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) with appropriate parameters.
These sets of features are independent of each other, e.g. the external
format will support sampler Y′CBCR conversion even if the non-external
format does not, and rendering directly to the external format will not be
supported even if the non-external format does support this. |

Android hardware buffers with the same external format **must** have the same
support for [VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_MIDPOINT_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_COSITED_CHROMA_SAMPLES_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](formats.html#VkFormatFeatureFlagBits),
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_SEPARATE_RECONSTRUCTION_FILTER_BIT](formats.html#VkFormatFeatureFlagBits),
and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_CHROMA_RECONSTRUCTION_EXPLICIT_FORCEABLE_BIT](formats.html#VkFormatFeatureFlagBits).
in `formatFeatures`.
Other format features **may** differ between Android hardware buffers that have
the same external format.
This allows applications to use the same [VkSamplerYcbcrConversion](samplers.html#VkSamplerYcbcrConversion)
object (and samplers and pipelines created from them) for any Android
hardware buffers that have the same external format.

If `format` is not [VK_FORMAT_UNDEFINED](formats.html#VkFormat), then the value of
`samplerYcbcrConversionComponents` **must** be valid when used as the
`components` member of [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo) with
that format.
If `format` is [VK_FORMAT_UNDEFINED](formats.html#VkFormat), all members of
`samplerYcbcrConversionComponents` **must** be the
[identity swizzle](resources.html#resources-image-views-identity-mappings).

Implementations **may** not always be able to determine the color model,
numerical range, or chroma offsets of the image contents, so the values in
`VkAndroidHardwareBufferFormatPropertiesANDROID` are only suggestions.
Applications **should** treat these values as sensible defaults to use in the
absence of more reliable information obtained through some other means.
If the underlying physical device is also usable via OpenGL ES with the
[`GL_OES_EGL_image_external`](https://registry.khronos.org/OpenGL/extensions/OES/OES_EGL_image_external.txt)
extension, the implementation **should** suggest values that will produce
similar sampled values as would be obtained by sampling the same external
image via `samplerExternalOES` in OpenGL ES using equivalent sampler
parameters.

|  | Since
| --- | --- |
[`GL_OES_EGL_image_external`](https://registry.khronos.org/OpenGL/extensions/OES/OES_EGL_image_external.txt)
does not require the same sampling and conversion calculations as Vulkan
does, achieving identical results between APIs **may** not be possible on some
implementations. |

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferFormatPropertiesANDROID-sType-sType) VUID-VkAndroidHardwareBufferFormatPropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_ANDROID](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAndroidHardwareBufferPropertiesANDROID](#VkAndroidHardwareBufferPropertiesANDROID)

The format properties of an Android hardware buffer **can** be obtained by
including a `VkAndroidHardwareBufferFormatProperties2ANDROID` structure
in the `pNext` chain of the
[VkAndroidHardwareBufferPropertiesANDROID](#VkAndroidHardwareBufferPropertiesANDROID) structure passed to
[vkGetAndroidHardwareBufferPropertiesANDROID](#vkGetAndroidHardwareBufferPropertiesANDROID).
This structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer with VK_KHR_format_feature_flags2 or VK_VERSION_1_3
typedef struct VkAndroidHardwareBufferFormatProperties2ANDROID {
    VkStructureType                  sType;
    void*                            pNext;
    VkFormat                         format;
    uint64_t                         externalFormat;
    VkFormatFeatureFlags2            formatFeatures;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkAndroidHardwareBufferFormatProperties2ANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the Vulkan format corresponding to the Android hardware
buffer’s format, or [VK_FORMAT_UNDEFINED](formats.html#VkFormat) if there is not an
equivalent Vulkan format.

* 
`externalFormat` is an implementation-defined external format
identifier for use with [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID).
It **must** not be zero.

* 
`formatFeatures` describes the capabilities of this external format
when used with an image bound to memory imported from `buffer`.

* 
`samplerYcbcrConversionComponents` is the component swizzle that
**should** be used in [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYcbcrModel` is a suggested color model to use in the
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYcbcrRange` is a suggested numerical value range to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedXChromaOffset` is a suggested X chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYChromaOffset` is a suggested Y chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

The bits reported in `formatFeatures` **must** include the bits reported in
the corresponding fields of
`VkAndroidHardwareBufferFormatPropertiesANDROID`::`formatFeatures`.

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferFormatProperties2ANDROID-sType-sType) VUID-VkAndroidHardwareBufferFormatProperties2ANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_PROPERTIES_2_ANDROID](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAndroidHardwareBufferPropertiesANDROID](#VkAndroidHardwareBufferPropertiesANDROID)

The [VkAndroidHardwareBufferFormatResolvePropertiesANDROID](#VkAndroidHardwareBufferFormatResolvePropertiesANDROID) structure is
defined as:

// Provided by VK_ANDROID_external_format_resolve
typedef struct VkAndroidHardwareBufferFormatResolvePropertiesANDROID {
    VkStructureType    sType;
    void*              pNext;
    VkFormat           colorAttachmentFormat;
} VkAndroidHardwareBufferFormatResolvePropertiesANDROID;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`colorAttachmentFormat` is a [VkFormat](formats.html#VkFormat) specifying the format of
color attachment images that **must** be used for color attachments when
resolving to the specified external format.
If the implementation supports external format resolves for the
specified external format, this value will be a color format supporting
the [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) in
[VkFormatProperties](formats.html#VkFormatProperties)::`optimalTilingFeatures` as returned by
[vkGetPhysicalDeviceFormatProperties](formats.html#vkGetPhysicalDeviceFormatProperties) with `format` equal to
`colorAttachmentFormat` If external format resolves are not
supported, this value will be [VK_FORMAT_UNDEFINED](formats.html#VkFormat).

Any Android hardware buffer created with the `GRALLOC_USAGE_HW_RENDER`
flag **must** be renderable in some way in Vulkan, either:

* 
[VkAndroidHardwareBufferFormatPropertiesANDROID](#VkAndroidHardwareBufferFormatPropertiesANDROID)::`format` **must**
be a format that supports [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits)
or [VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) in
[VkFormatProperties](formats.html#VkFormatProperties)::`optimalTilingFeatures`; or

* 
`colorAttachmentFormat` **must** be a format that supports
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](formats.html#VkFormatFeatureFlagBits) in
[VkFormatProperties](formats.html#VkFormatProperties)::`optimalTilingFeatures`.

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferFormatResolvePropertiesANDROID-sType-sType) VUID-VkAndroidHardwareBufferFormatResolvePropertiesANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_FORMAT_RESOLVE_PROPERTIES_ANDROID](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAndroidHardwareBufferPropertiesANDROID](#VkAndroidHardwareBufferPropertiesANDROID)

To export an address representing the payload of a Vulkan device memory
object accessible by remote devices, call:

// Provided by VK_NV_external_memory_rdma
VkResult vkGetMemoryRemoteAddressNV(
    VkDevice                                    device,
    const VkMemoryGetRemoteAddressInfoNV*       pMemoryGetRemoteAddressInfo,
    VkRemoteAddressNV*                          pAddress);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pMemoryGetRemoteAddressInfo` is a pointer to a
[VkMemoryGetRemoteAddressInfoNV](#VkMemoryGetRemoteAddressInfoNV) structure containing parameters of
the export operation.

* 
`pAddress` is a pointer to a `VkRemoteAddressNV` value in
which an address representing the payload of the device memory object is
returned.

More communication may be required between the kernel-mode drivers of the
devices involved.
This information is out of scope of this documentation and should be
requested from the vendors of the devices.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryRemoteAddressNV-device-parameter) VUID-vkGetMemoryRemoteAddressNV-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryRemoteAddressNV-pMemoryGetRemoteAddressInfo-parameter) VUID-vkGetMemoryRemoteAddressNV-pMemoryGetRemoteAddressInfo-parameter

 `pMemoryGetRemoteAddressInfo` **must** be a valid pointer to a valid [VkMemoryGetRemoteAddressInfoNV](#VkMemoryGetRemoteAddressInfoNV) structure

* 
[](#VUID-vkGetMemoryRemoteAddressNV-pAddress-parameter) VUID-vkGetMemoryRemoteAddressNV-pAddress-parameter

 `pAddress` **must** be a valid pointer to a `VkRemoteAddressNV` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryGetRemoteAddressInfoNV` structure is defined as:

// Provided by VK_NV_external_memory_rdma
typedef struct VkMemoryGetRemoteAddressInfoNV {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetRemoteAddressInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the remote accessible
address will be exported.

* 
`handleType` is the type of handle requested.

Valid Usage

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-handleType-04966) VUID-VkMemoryGetRemoteAddressInfoNV-handleType-04966

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)::`handleTypes` when `memory`
was created

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-sType-sType) VUID-VkMemoryGetRemoteAddressInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_REMOTE_ADDRESS_INFO_NV](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-pNext-pNext) VUID-VkMemoryGetRemoteAddressInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-memory-parameter) VUID-VkMemoryGetRemoteAddressInfoNV-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-VkMemoryGetRemoteAddressInfoNV-handleType-parameter) VUID-VkMemoryGetRemoteAddressInfoNV-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

`VkRemoteAddressNV` represents an address of a memory object
accessible by remote devices, as returned in
[vkGetMemoryRemoteAddressNV](#vkGetMemoryRemoteAddressNV)::`pAddress`.

// Provided by VK_NV_external_memory_rdma
typedef void* VkRemoteAddressNV;

On Fuchsia, when allocating memory that **may** be imported from another
device, process, or Vulkan instance, add a
[VkImportMemoryZirconHandleInfoFUCHSIA](#VkImportMemoryZirconHandleInfoFUCHSIA) structure to the `pNext`
chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.

External memory on Fuchsia is imported and exported using VMO handles of
type `zx_handle_t`.
VMO handles to external memory are canonically obtained from Fuchsia’s
Sysmem service or from syscalls such as `zx_vmo_create`().
VMO handles for import can also be obtained by exporting them from another
Vulkan instance as described in [exporting fuchsia device memory](#exporting-fuchsia-device-memory).

Importing VMO handles to the Vulkan instance transfers ownership of the
handle to the instance from the application.
The application **must** not perform any operations on the handle after
successful import.

Applications **can** import the same underlying memory into multiple instances
of Vulkan, into the same instance from which it was exported, and multiple
times into a given Vulkan instance.
In all cases, each import operation **must** create a distinct
`VkDeviceMemory` object.

The `VkImportMemoryZirconHandleInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_memory
typedef struct VkImportMemoryZirconHandleInfoFUCHSIA {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    zx_handle_t                           handle;
} VkImportMemoryZirconHandleInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of `handle`.

* 
`handle` is a `zx_handle_t` (Zircon) handle to the external
memory.

Valid Usage

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-04771) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-04771

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handle-04772) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handle-04772

`handle` **must** be a valid VMO handle

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-sType-sType) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_ZIRCON_HANDLE_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkImportMemoryZirconHandleInfoFUCHSIA-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To obtain the memoryTypeIndex for the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure,
call `vkGetMemoryZirconHandlePropertiesFUCHSIA`:

// Provided by VK_FUCHSIA_external_memory
VkResult vkGetMemoryZirconHandlePropertiesFUCHSIA(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    zx_handle_t                                 zirconHandle,
    VkMemoryZirconHandlePropertiesFUCHSIA*      pMemoryZirconHandleProperties);

* 
`device` is the [VkDevice](devsandqueues.html#VkDevice).

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of `zirconHandle`

* 
`zirconHandle` is a `zx_handle_t` (Zircon) handle to the external
resource.

* 
`pMemoryZirconHandleProperties` is a pointer to a
[VkMemoryZirconHandlePropertiesFUCHSIA](#VkMemoryZirconHandlePropertiesFUCHSIA) structure in which the
result will be stored.

Valid Usage

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-04773) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-04773

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-zirconHandle-04774) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-zirconHandle-04774

`zirconHandle` **must** reference a valid VMO

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-device-parameter) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-parameter) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

* 
[](#VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-pMemoryZirconHandleProperties-parameter) VUID-vkGetMemoryZirconHandlePropertiesFUCHSIA-pMemoryZirconHandleProperties-parameter

 `pMemoryZirconHandleProperties` **must** be a valid pointer to a [VkMemoryZirconHandlePropertiesFUCHSIA](#VkMemoryZirconHandlePropertiesFUCHSIA) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryZirconHandlePropertiesFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_external_memory
typedef struct VkMemoryZirconHandlePropertiesFUCHSIA {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryZirconHandlePropertiesFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` a bitmask containing one bit set for every memory
type which the specified handle can be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryZirconHandlePropertiesFUCHSIA-sType-sType) VUID-VkMemoryZirconHandlePropertiesFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_ZIRCON_HANDLE_PROPERTIES_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryZirconHandlePropertiesFUCHSIA-pNext-pNext) VUID-VkMemoryZirconHandlePropertiesFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

With `pMemoryZirconHandleProperties` now successfully populated by
[vkGetMemoryZirconHandlePropertiesFUCHSIA](#vkGetMemoryZirconHandlePropertiesFUCHSIA), assign the
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) memoryTypeIndex field to a memory type which has
a bit set in the [VkMemoryZirconHandlePropertiesFUCHSIA](#VkMemoryZirconHandlePropertiesFUCHSIA) memoryTypeBits
field.

Similar to importing, exporting a VMO handle from Vulkan transfers ownership
of the handle from the Vulkan instance to the application.
The application is responsible for closing the handle with
`zx_handle_close`() when it is no longer in use.

To export device memory as a Zircon handle that can be used by another
instance, device, or process, retrieve the handle to the
[VkDeviceMemory](#VkDeviceMemory) using the command:

// Provided by VK_FUCHSIA_external_memory
VkResult vkGetMemoryZirconHandleFUCHSIA(
    VkDevice                                    device,
    const VkMemoryGetZirconHandleInfoFUCHSIA*   pGetZirconHandleInfo,
    zx_handle_t*                                pZirconHandle);

* 
`device` is the [VkDevice](devsandqueues.html#VkDevice).

* 
`pGetZirconHandleInfo` is a pointer to a
[VkMemoryGetZirconHandleInfoFUCHSIA](#VkMemoryGetZirconHandleInfoFUCHSIA) structure.

* 
`pZirconHandle` is a pointer to a `zx_handle_t` which holds the
resulting Zircon handle.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryZirconHandleFUCHSIA-device-parameter) VUID-vkGetMemoryZirconHandleFUCHSIA-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter) VUID-vkGetMemoryZirconHandleFUCHSIA-pGetZirconHandleInfo-parameter

 `pGetZirconHandleInfo` **must** be a valid pointer to a valid [VkMemoryGetZirconHandleInfoFUCHSIA](#VkMemoryGetZirconHandleInfoFUCHSIA) structure

* 
[](#VUID-vkGetMemoryZirconHandleFUCHSIA-pZirconHandle-parameter) VUID-vkGetMemoryZirconHandleFUCHSIA-pZirconHandle-parameter

 `pZirconHandle` **must** be a valid pointer to a `zx_handle_t` value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

`VkMemoryGetZirconHandleInfoFUCHSIA` is defined as:

// Provided by VK_FUCHSIA_external_memory
typedef struct VkMemoryGetZirconHandleInfoFUCHSIA {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetZirconHandleInfoFUCHSIA;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` the [VkDeviceMemory](#VkDeviceMemory) being exported.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of the handle pointed to by
[vkGetMemoryZirconHandleFUCHSIA](#vkGetMemoryZirconHandleFUCHSIA)::`pZirconHandle`.

Valid Usage

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04775) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04775

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ZIRCON_VMO_BIT_FUCHSIA](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04776) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-04776

`handleType` **must** have been included in the `handleTypes` field
of the `VkExportMemoryAllocateInfo` structure when the external
memory was allocated

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-sType-sType) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_ZIRCON_HANDLE_INFO_FUCHSIA](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-pNext-pNext) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-memory-parameter) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-parameter) VUID-VkMemoryGetZirconHandleInfoFUCHSIA-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

With the result `pZirconHandle` now obtained, the memory properties for
the handle can be retrieved using
[vkGetMemoryZirconHandlePropertiesFUCHSIA](#vkGetMemoryZirconHandlePropertiesFUCHSIA) as documented above
substituting the dereferenced, retrieved `pZirconHandle` in for the
`zirconHandle` argument.

A Vulkan implementation that is layered on top of Metal on Apple device
platform, and implements the `[VK_EXT_metal_objects](../appendices/extensions.html#VK_EXT_metal_objects)` extension,
supports the ability to import and export the underlying Metal objects
associated with specific Vulkan objects.

The underlying Metal objects associated with certain Vulkan objects can be
exported from those Vulkan objects using the `pNext` chain of the
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT) parameter of the
[vkExportMetalObjectsEXT](#vkExportMetalObjectsEXT) command.

An [VkDeviceMemory](#VkDeviceMemory) object can be allocated on an existing
`MTLBuffer` object, by including the `MTLBuffer` object in a
[VkImportMetalBufferInfoEXT](#VkImportMetalBufferInfoEXT) structure in the `pNext` chain of the
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure in the [vkAllocateMemory](#vkAllocateMemory) command.

A new [VkImage](resources.html#VkImage) object can be created on an existing `IOSurface`
object, or one or more existing Metal `MTLTexture` objects, by including
those Metal objects in either [VkImportMetalIOSurfaceInfoEXT](#VkImportMetalIOSurfaceInfoEXT) or
[VkImportMetalTextureInfoEXT](#VkImportMetalTextureInfoEXT) structures in the `pNext` chain of the
[VkImageCreateInfo](resources.html#VkImageCreateInfo) structure in the [vkCreateImage](resources.html#vkCreateImage) command.

To export Metal objects from Vulkan objects, the application **must** first
indicate the intention to do so during the creation of the Vulkan object, by
including one or more [VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structures in
the `pNext` chain of the [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo),
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo), [VkImageCreateInfo](resources.html#VkImageCreateInfo),
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo), [VkBufferViewCreateInfo](resources.html#VkBufferViewCreateInfo),
[VkSemaphoreCreateInfo](synchronization.html#VkSemaphoreCreateInfo), or [VkEventCreateInfo](synchronization.html#VkEventCreateInfo), in the
corresponding Vulkan object creation command.

The `VkExportMetalObjectCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalObjectCreateInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExportMetalObjectTypeFlagBitsEXT    exportObjectType;
} VkExportMetalObjectCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`exportObjectType` is a [VkExportMetalObjectTypeFlagBitsEXT](#VkExportMetalObjectTypeFlagBitsEXT)
indicating the type of Metal object that the application may request to
be exported from the Vulkan object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalObjectCreateInfoEXT-sType-sType) VUID-VkExportMetalObjectCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECT_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMetalObjectCreateInfoEXT-exportObjectType-parameter) VUID-VkExportMetalObjectCreateInfoEXT-exportObjectType-parameter

 If `exportObjectType` is not `0`, `exportObjectType` **must** be a valid [VkExportMetalObjectTypeFlagBitsEXT](#VkExportMetalObjectTypeFlagBitsEXT) value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkBufferViewCreateInfo](resources.html#VkBufferViewCreateInfo)

* 
[VkEventCreateInfo](synchronization.html#VkEventCreateInfo)

* 
[VkImageCreateInfo](resources.html#VkImageCreateInfo)

* 
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)

* 
[VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

* 
[VkSemaphoreCreateInfo](synchronization.html#VkSemaphoreCreateInfo)

Bits which indicate the types of Metal objects that may be exported from a
corresponding Vulkan object are:

// Provided by VK_EXT_metal_objects
typedef enum VkExportMetalObjectTypeFlagBitsEXT {
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT = 0x00000001,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT = 0x00000002,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT = 0x00000004,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT = 0x00000008,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT = 0x00000010,
    VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT = 0x00000020,
} VkExportMetalObjectTypeFlagBitsEXT;

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) specifies that a
Metal `MTLDevice` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) specifies
that a Metal `MTLCommandQueue` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) specifies that a
Metal `MTLBuffer` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) specifies that a
Metal `MTLTexture` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) specifies that
a Metal `IOSurface` may be exported.

* 
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) specifies
that a Metal `MTLSharedEvent` may be exported.

// Provided by VK_EXT_metal_objects
typedef VkFlags VkExportMetalObjectTypeFlagsEXT;

`VkExportMetalObjectTypeFlagsEXT` is a bitmask type for setting a mask
of zero or more [VkExportMetalObjectTypeFlagBitsEXT](#VkExportMetalObjectTypeFlagBitsEXT).

To export Metal objects that underlie Vulkan objects, call:

// Provided by VK_EXT_metal_objects
void vkExportMetalObjectsEXT(
    VkDevice                                    device,
    VkExportMetalObjectsInfoEXT*                pMetalObjectsInfo);

* 
`device` is the device that created the Vulkan objects.

* 
`pMetalObjectsInfo` is a pointer to a
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT) structure whose `pNext` chain
contains structures, each identifying a Vulkan object and providing a
pointer through which the Metal object will be returned.

Valid Usage (Implicit)

* 
[](#VUID-vkExportMetalObjectsEXT-device-parameter) VUID-vkExportMetalObjectsEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkExportMetalObjectsEXT-pMetalObjectsInfo-parameter) VUID-vkExportMetalObjectsEXT-pMetalObjectsInfo-parameter

 `pMetalObjectsInfo` **must** be a valid pointer to a [VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT) structure

The `VkExportMetalObjectsInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalObjectsInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
} VkExportMetalObjectsInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

Valid Usage

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06791) VUID-VkExportMetalObjectsInfoEXT-pNext-06791

If the `pNext` chain includes a [VkExportMetalDeviceInfoEXT](#VkExportMetalDeviceInfoEXT)
structure, the [VkInstance](initialization.html#VkInstance) **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_DEVICE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo) structure in the
[vkCreateInstance](initialization.html#vkCreateInstance) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06792) VUID-VkExportMetalObjectsInfoEXT-pNext-06792

If the `pNext` chain includes a
[VkExportMetalCommandQueueInfoEXT](#VkExportMetalCommandQueueInfoEXT) structure, the [VkInstance](initialization.html#VkInstance)
**must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_COMMAND_QUEUE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkInstanceCreateInfo](initialization.html#VkInstanceCreateInfo) structure in the
[vkCreateInstance](initialization.html#vkCreateInstance) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06793) VUID-VkExportMetalObjectsInfoEXT-pNext-06793

If the `pNext` chain includes a [VkExportMetalBufferInfoEXT](#VkExportMetalBufferInfoEXT)
structure, the [VkDeviceMemory](#VkDeviceMemory) in its `memory` member **must**
have been allocated with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_BUFFER_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure in the
[vkAllocateMemory](#vkAllocateMemory) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06794) VUID-VkExportMetalObjectsInfoEXT-pNext-06794

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, exactly one of its `image`, `imageView`, or
`bufferView` members **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06795) VUID-VkExportMetalObjectsInfoEXT-pNext-06795

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and its `image` member is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
[VkImage](resources.html#VkImage) in its `image` member **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure in the
[vkCreateImage](resources.html#vkCreateImage) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06796) VUID-VkExportMetalObjectsInfoEXT-pNext-06796

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and its `imageView` member is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
the [VkImageView](resources.html#VkImageView) in its `imageView` member **must** have been
created with [VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in
the `exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo) structure in the
[vkCreateImageView](resources.html#vkCreateImageView) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06797) VUID-VkExportMetalObjectsInfoEXT-pNext-06797

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and its `bufferView` member is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE),
the [VkBufferView](resources.html#VkBufferView) in its `bufferView` member **must** have been
created with [VK_EXPORT_METAL_OBJECT_TYPE_METAL_TEXTURE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in
the `exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkBufferViewCreateInfo](resources.html#VkBufferViewCreateInfo) structure in the
[vkCreateBufferView](resources.html#vkCreateBufferView) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06798) VUID-VkExportMetalObjectsInfoEXT-pNext-06798

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and if either its `image` or `imageView` member is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), then `plane` **must** be
[VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits), [VK_IMAGE_ASPECT_PLANE_1_BIT](resources.html#VkImageAspectFlagBits), or
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06799) VUID-VkExportMetalObjectsInfoEXT-pNext-06799

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and if the [VkImage](resources.html#VkImage) in its `image` member does not
have a [multi-planar format](formats.html#formats-multiplanar), then its
`plane` member **must** be [VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06800) VUID-VkExportMetalObjectsInfoEXT-pNext-06800

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and if the [VkImage](resources.html#VkImage) in its `image` member has a
[multi-planar format](formats.html#formats-multiplanar) with only two planes, then
its `plane` member **must** not be [VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06801) VUID-VkExportMetalObjectsInfoEXT-pNext-06801

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and if the [VkImageView](resources.html#VkImageView) in its `imageView` member
does not have a [multi-planar format](formats.html#formats-multiplanar), then its
`plane` member **must** be [VK_IMAGE_ASPECT_PLANE_0_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06802) VUID-VkExportMetalObjectsInfoEXT-pNext-06802

If the `pNext` chain includes a [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)
structure, and if the [VkImageView](resources.html#VkImageView) in its `imageView` member
has a [multi-planar format](formats.html#formats-multiplanar) with only two planes,
then its `plane` member **must** not be
[VK_IMAGE_ASPECT_PLANE_2_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06803) VUID-VkExportMetalObjectsInfoEXT-pNext-06803

If the `pNext` chain includes a [VkExportMetalIOSurfaceInfoEXT](#VkExportMetalIOSurfaceInfoEXT)
structure, the [VkImage](resources.html#VkImage) in its `image` member **must** have been
created with [VK_EXPORT_METAL_OBJECT_TYPE_METAL_IOSURFACE_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT)
in the `exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure in the
[vkCreateImage](resources.html#vkCreateImage) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06804) VUID-VkExportMetalObjectsInfoEXT-pNext-06804

If the `pNext` chain includes a
[VkExportMetalSharedEventInfoEXT](#VkExportMetalSharedEventInfoEXT) structure, exactly one of its
`semaphore` or `event` members **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06805) VUID-VkExportMetalObjectsInfoEXT-pNext-06805

If the `pNext` chain includes a
[VkExportMetalSharedEventInfoEXT](#VkExportMetalSharedEventInfoEXT) structure, and its `semaphore`
member is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the [VkSemaphore](synchronization.html#VkSemaphore) in its
`semaphore` member **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkSemaphoreCreateInfo](synchronization.html#VkSemaphoreCreateInfo) structure in the
[vkCreateSemaphore](synchronization.html#vkCreateSemaphore) command

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-06806) VUID-VkExportMetalObjectsInfoEXT-pNext-06806

If the `pNext` chain includes a
[VkExportMetalSharedEventInfoEXT](#VkExportMetalSharedEventInfoEXT) structure, and its `event`
member is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the [VkEvent](synchronization.html#VkEvent) in its `event`
member **must** have been created with
[VK_EXPORT_METAL_OBJECT_TYPE_METAL_SHARED_EVENT_BIT_EXT](#VkExportMetalObjectTypeFlagBitsEXT) in the
`exportObjectType` member of a
[VkExportMetalObjectCreateInfoEXT](#VkExportMetalObjectCreateInfoEXT) structure in the `pNext`
chain of the [VkEventCreateInfo](synchronization.html#VkEventCreateInfo) structure in the
[vkCreateEvent](synchronization.html#vkCreateEvent) command

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-sType-sType) VUID-VkExportMetalObjectsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_OBJECTS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-pNext-pNext) VUID-VkExportMetalObjectsInfoEXT-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkExportMetalBufferInfoEXT](#VkExportMetalBufferInfoEXT), [VkExportMetalCommandQueueInfoEXT](#VkExportMetalCommandQueueInfoEXT), [VkExportMetalDeviceInfoEXT](#VkExportMetalDeviceInfoEXT), [VkExportMetalIOSurfaceInfoEXT](#VkExportMetalIOSurfaceInfoEXT), [VkExportMetalSharedEventInfoEXT](#VkExportMetalSharedEventInfoEXT), or [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)

* 
[](#VUID-VkExportMetalObjectsInfoEXT-sType-unique) VUID-VkExportMetalObjectsInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique, with the exception of structures of type [VkExportMetalBufferInfoEXT](#VkExportMetalBufferInfoEXT), [VkExportMetalCommandQueueInfoEXT](#VkExportMetalCommandQueueInfoEXT), [VkExportMetalIOSurfaceInfoEXT](#VkExportMetalIOSurfaceInfoEXT), [VkExportMetalSharedEventInfoEXT](#VkExportMetalSharedEventInfoEXT), or [VkExportMetalTextureInfoEXT](#VkExportMetalTextureInfoEXT)

To export the Metal `MTLDevice` object underlying the
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) associated with a [VkDevice](devsandqueues.html#VkDevice) object, include a
`VkExportMetalDeviceInfoEXT` structure in the `pNext` chain of the
`pMetalObjectsInfo` parameter of a [vkExportMetalObjectsEXT](#vkExportMetalObjectsEXT) call.

The `VkExportMetalDeviceInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalDeviceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    MTLDevice_id       mtlDevice;
} VkExportMetalDeviceInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mtlDevice` is the Metal `id` object underlying the
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) associated with the [VkDevice](devsandqueues.html#VkDevice) object
identified in the call.
The implementation will return the `MTLDevice` in this member, or it
will return `NULL` if no `MTLDevice` could be found underlying the
[VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalDeviceInfoEXT-sType-sType) VUID-VkExportMetalDeviceInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_DEVICE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT)

The type `id` is defined in Apple’s Metal framework, but to
remove an unnecessary compile time dependency, an incomplete type definition
of `MTLDevice_id` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_objects
#ifdef __OBJC__
@protocol MTLDevice;
typedef __unsafe_unretained id MTLDevice_id;
#else
typedef void* MTLDevice_id;
#endif

To export the Metal `MTLCommandQueue` object underlying a [VkQueue](devsandqueues.html#VkQueue)
object, include a `VkExportMetalCommandQueueInfoEXT` structure in the
`pNext` chain of the `pMetalObjectsInfo` parameter of a
[vkExportMetalObjectsEXT](#vkExportMetalObjectsEXT) call.

The `VkExportMetalCommandQueueInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalCommandQueueInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkQueue               queue;
    MTLCommandQueue_id    mtlCommandQueue;
} VkExportMetalCommandQueueInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queue` is a [VkQueue](devsandqueues.html#VkQueue).

* 
`mtlCommandQueue` is the Metal `id` object
underlying the [VkQueue](devsandqueues.html#VkQueue) object in `queue`.
The implementation will return the `MTLCommandQueue` in this member,
or it will return `NULL` if no `MTLCommandQueue` could be found
underlying the [VkQueue](devsandqueues.html#VkQueue) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalCommandQueueInfoEXT-sType-sType) VUID-VkExportMetalCommandQueueInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_COMMAND_QUEUE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMetalCommandQueueInfoEXT-queue-parameter) VUID-VkExportMetalCommandQueueInfoEXT-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT)

The type `id` is defined in Apple’s Metal framework, but to
remove an unnecessary compile time dependency, an incomplete type definition
of `MTLCommandQueue_id` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_objects
#ifdef __OBJC__
@protocol MTLCommandQueue;
typedef __unsafe_unretained id MTLCommandQueue_id;
#else
typedef void* MTLCommandQueue_id;
#endif

To export the Metal `MTLBuffer` object underlying a [VkDeviceMemory](#VkDeviceMemory)
object, include a `VkExportMetalBufferInfoEXT` structure in the
`pNext` chain of the `pMetalObjectsInfo` parameter of a
[vkExportMetalObjectsEXT](#vkExportMetalObjectsEXT) call.

The `VkExportMetalBufferInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalBufferInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
    MTLBuffer_id       mtlBuffer;
} VkExportMetalBufferInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is a [VkDeviceMemory](#VkDeviceMemory).

* 
`mtlBuffer` is the Metal `id` object underlying the
[VkDeviceMemory](#VkDeviceMemory) object in `memory`.
The implementation will return the `MTLBuffer` in this member, or it
will return `NULL` if no `MTLBuffer` could be found underlying the
[VkDeviceMemory](#VkDeviceMemory) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalBufferInfoEXT-sType-sType) VUID-VkExportMetalBufferInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_BUFFER_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMetalBufferInfoEXT-memory-parameter) VUID-VkExportMetalBufferInfoEXT-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT)

To import a Metal `MTLBuffer` object to underlie a [VkDeviceMemory](#VkDeviceMemory)
object, include a `VkImportMetalBufferInfoEXT` structure in the
`pNext` chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure in a
[vkAllocateMemory](#vkAllocateMemory) command.

The `VkImportMetalBufferInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalBufferInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    MTLBuffer_id       mtlBuffer;
} VkImportMetalBufferInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mtlBuffer` is the Metal `id` object that is to underlie
the [VkDeviceMemory](#VkDeviceMemory).

The application **must** ensure that the configuration of the `id`
object is compatible with the configuration of the [VkDeviceMemory](#VkDeviceMemory).
Failure to do so results in **undefined** behavior.

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalBufferInfoEXT-sType-sType) VUID-VkImportMetalBufferInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_BUFFER_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

The type `id` is defined in Apple’s Metal framework, but to
remove an unnecessary compile time dependency, an incomplete type definition
of `MTLBuffer_id` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_objects
#ifdef __OBJC__
@protocol MTLBuffer;
typedef __unsafe_unretained id MTLBuffer_id;
#else
typedef void* MTLBuffer_id;
#endif

To export a Metal `MTLTexture` object underlying a [VkImage](resources.html#VkImage),
[VkImageView](resources.html#VkImageView), or [VkBufferView](resources.html#VkBufferView) object, include a
`VkExportMetalTextureInfoEXT` structure in the `pNext` chain of the
`pMetalObjectsInfo` parameter of a [vkExportMetalObjectsEXT](#vkExportMetalObjectsEXT) call.

The `VkExportMetalTextureInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalTextureInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkImage                  image;
    VkImageView              imageView;
    VkBufferView             bufferView;
    VkImageAspectFlagBits    plane;
    MTLTexture_id            mtlTexture;
} VkExportMetalTextureInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a [VkImage](resources.html#VkImage).

* 
`imageView` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a [VkImageView](resources.html#VkImageView).

* 
`bufferView` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a [VkBufferView](resources.html#VkBufferView).

* 
`plane` specifies the plane of a multi-planar [VkImage](resources.html#VkImage) or
[VkImageView](resources.html#VkImageView).

* 
`mtlTexture` is the Metal `id` object underlying the
[VkImage](resources.html#VkImage), [VkImageView](resources.html#VkImageView), or [VkBufferView](resources.html#VkBufferView) object in
`image`, `imageView`, or `bufferView`, respectively, at the
plane indicated in `aspectMask`.
The implementation will return the `MTLTexture` in this member, or it
will return `NULL` if no `MTLTexture` could be found underlying the
[VkImage](resources.html#VkImage), [VkImageView](resources.html#VkImageView), or [VkBufferView](resources.html#VkBufferView) object, at the
plane indicated in `aspectMask`.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalTextureInfoEXT-sType-sType) VUID-VkExportMetalTextureInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_TEXTURE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMetalTextureInfoEXT-image-parameter) VUID-VkExportMetalTextureInfoEXT-image-parameter

 If `image` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `image` **must** be a valid [VkImage](resources.html#VkImage) handle

* 
[](#VUID-VkExportMetalTextureInfoEXT-imageView-parameter) VUID-VkExportMetalTextureInfoEXT-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

* 
[](#VUID-VkExportMetalTextureInfoEXT-bufferView-parameter) VUID-VkExportMetalTextureInfoEXT-bufferView-parameter

 If `bufferView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `bufferView` **must** be a valid [VkBufferView](resources.html#VkBufferView) handle

* 
[](#VUID-VkExportMetalTextureInfoEXT-plane-parameter) VUID-VkExportMetalTextureInfoEXT-plane-parameter

 `plane` **must** be a valid [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits) value

* 
[](#VUID-VkExportMetalTextureInfoEXT-commonparent) VUID-VkExportMetalTextureInfoEXT-commonparent

 Each of `bufferView`, `image`, and `imageView` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT)

To import one or more existing Metal `MTLTexture` objects to underlie a
[VkImage](resources.html#VkImage) object, include one or more `VkImportMetalTextureInfoEXT`
structures in the `pNext` chain of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure
in a [vkCreateImage](resources.html#vkCreateImage) command.

The `VkImportMetalTextureInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalTextureInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkImageAspectFlagBits    plane;
    MTLTexture_id            mtlTexture;
} VkImportMetalTextureInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`plane` specifies the plane of the [VkImage](resources.html#VkImage) that the
`id` object should be attached to.

* 
`mtlTexture` is a the Metal `id` object that is to
underlie the [VkImage](resources.html#VkImage) plane.

The `pNext` chain **must** include one `VkImportMetalTextureInfoEXT`
structure for each plane in the [VkImage](resources.html#VkImage).
The application **must** ensure that the configuration of the Metal
`id` objects are compatible with the configuration of the
[VkImage](resources.html#VkImage).
Failure to do so results in **undefined** behavior.

|  | Due to `id` already being backed by memory, images created with
| --- | --- |
`VkImportMetalTextureInfoEXT` in the `pNext` of the
[VkImageCreateInfo](resources.html#VkImageCreateInfo) will be treated as bound to a VkDeviceMemory. |

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalTextureInfoEXT-sType-sType) VUID-VkImportMetalTextureInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_TEXTURE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMetalTextureInfoEXT-plane-parameter) VUID-VkImportMetalTextureInfoEXT-plane-parameter

 `plane` **must** be a valid [VkImageAspectFlagBits](resources.html#VkImageAspectFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](resources.html#VkImageCreateInfo)

The type `id` is defined in Apple’s Metal framework, but to
remove an unnecessary compile time dependency, an incomplete type definition
of `MTLTexture_id` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_objects
#ifdef __OBJC__
@protocol MTLTexture;
typedef __unsafe_unretained id MTLTexture_id;
#else
typedef void* MTLTexture_id;
#endif

To export the Metal `IOSurfaceRef` object underlying a [VkImage](resources.html#VkImage)
object, include a `VkExportMetalIOSurfaceInfoEXT` structure in the
`pNext` chain of the `pMetalObjectsInfo` parameter of a
[vkExportMetalObjectsEXT](#vkExportMetalObjectsEXT) call.

The `VkExportMetalIOSurfaceInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalIOSurfaceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
    IOSurfaceRef       ioSurface;
} VkExportMetalIOSurfaceInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is a [VkImage](resources.html#VkImage).

* 
`ioSurface` is the Metal `IOSurfaceRef` object underlying the
[VkImage](resources.html#VkImage) object in `image`.
The implementation will return the `IOSurfaceRef` in this member,
or it will return `NULL` if no `IOSurfaceRef` could be found
underlying the [VkImage](resources.html#VkImage) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalIOSurfaceInfoEXT-sType-sType) VUID-VkExportMetalIOSurfaceInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_IO_SURFACE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMetalIOSurfaceInfoEXT-image-parameter) VUID-VkExportMetalIOSurfaceInfoEXT-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT)

To import, or create, a Metal `IOSurfaceRef` object to underlie a
[VkImage](resources.html#VkImage) object, include a `VkImportMetalIOSurfaceInfoEXT`
structure in the `pNext` chain of the [VkImageCreateInfo](resources.html#VkImageCreateInfo) structure
in a [vkCreateImage](resources.html#vkCreateImage) command.

The `VkImportMetalIOSurfaceInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalIOSurfaceInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    IOSurfaceRef       ioSurface;
} VkImportMetalIOSurfaceInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`ioSurface` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or the Metal
`IOSurfaceRef` object that is to underlie the [VkImage](resources.html#VkImage).

If `ioSurface` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), it will be used to underlie
the [VkImage](resources.html#VkImage).
If `ioSurface` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the implementation will create a
new `IOSurface` to underlie the [VkImage](resources.html#VkImage).

If provided, the application **must** ensure that the configuration of the
`IOSurfaceRef` object is compatible with the configuration of the
[VkImage](resources.html#VkImage).
Failure to do so results in **undefined** behavior.

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalIOSurfaceInfoEXT-sType-sType) VUID-VkImportMetalIOSurfaceInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_IO_SURFACE_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](resources.html#VkImageCreateInfo)

The type `IOSurfaceRef` is defined in Apple’s CoreGraphics framework,
but to remove an unnecessary compile time dependency, an incomplete type
definition of `IOSurfaceRef` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_objects
typedef struct __IOSurface* IOSurfaceRef;

To export the Metal `MTLSharedEvent` object underlying a
[VkSemaphore](synchronization.html#VkSemaphore) or [VkEvent](synchronization.html#VkEvent) object, include a
`VkExportMetalSharedEventInfoEXT` structure in the `pNext` chain of
the `pMetalObjectsInfo` parameter of a [vkExportMetalObjectsEXT](#vkExportMetalObjectsEXT)
call.

The `VkExportMetalSharedEventInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkExportMetalSharedEventInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    VkSemaphore          semaphore;
    VkEvent              event;
    MTLSharedEvent_id    mtlSharedEvent;
} VkExportMetalSharedEventInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`semaphore` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a [VkSemaphore](synchronization.html#VkSemaphore).

* 
`event` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) or a [VkEvent](synchronization.html#VkEvent).

* 
`mtlSharedEvent` is the Metal `id` object underlying
the [VkSemaphore](synchronization.html#VkSemaphore) or [VkEvent](synchronization.html#VkEvent) object in `semaphore` or
`event`, respectively.
The implementation will return the `MTLSharedEvent` in this member,
or it will return `NULL` if no `MTLSharedEvent` could be found
underlying the [VkSemaphore](synchronization.html#VkSemaphore) or [VkEvent](synchronization.html#VkEvent) object.

Valid Usage (Implicit)

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-sType-sType) VUID-VkExportMetalSharedEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXPORT_METAL_SHARED_EVENT_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-semaphore-parameter) VUID-VkExportMetalSharedEventInfoEXT-semaphore-parameter

 If `semaphore` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `semaphore` **must** be a valid [VkSemaphore](synchronization.html#VkSemaphore) handle

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-event-parameter) VUID-VkExportMetalSharedEventInfoEXT-event-parameter

 If `event` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `event` **must** be a valid [VkEvent](synchronization.html#VkEvent) handle

* 
[](#VUID-VkExportMetalSharedEventInfoEXT-commonparent) VUID-VkExportMetalSharedEventInfoEXT-commonparent

 Both of `event`, and `semaphore` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkExportMetalObjectsInfoEXT](#VkExportMetalObjectsInfoEXT)

To import a Metal `id` object to underlie a
[VkSemaphore](synchronization.html#VkSemaphore) or [VkEvent](synchronization.html#VkEvent) object, include a
`VkImportMetalSharedEventInfoEXT` structure in the `pNext` chain of
the [VkSemaphoreCreateInfo](synchronization.html#VkSemaphoreCreateInfo) or [VkEventCreateInfo](synchronization.html#VkEventCreateInfo) structure in a
[vkCreateSemaphore](synchronization.html#vkCreateSemaphore) or [vkCreateEvent](synchronization.html#vkCreateEvent) command, respectively.

The `VkImportMetalSharedEventInfoEXT` structure is defined as:

// Provided by VK_EXT_metal_objects
typedef struct VkImportMetalSharedEventInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    MTLSharedEvent_id    mtlSharedEvent;
} VkImportMetalSharedEventInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mtlSharedEvent` is the Metal `id` object that is to
underlie the [VkSemaphore](synchronization.html#VkSemaphore) or [VkEvent](synchronization.html#VkEvent).

If the `pNext` chain of the [VkSemaphoreCreateInfo](synchronization.html#VkSemaphoreCreateInfo) structure
includes both `VkImportMetalSharedEventInfoEXT` and
[VkSemaphoreTypeCreateInfo](synchronization.html#VkSemaphoreTypeCreateInfo), the `signaledValue` property of the
imported `id` object will be set to
[VkSemaphoreTypeCreateInfo](synchronization.html#VkSemaphoreTypeCreateInfo)::`initialValue`.

Valid Usage (Implicit)

* 
[](#VUID-VkImportMetalSharedEventInfoEXT-sType-sType) VUID-VkImportMetalSharedEventInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_METAL_SHARED_EVENT_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkEventCreateInfo](synchronization.html#VkEventCreateInfo)

* 
[VkSemaphoreCreateInfo](synchronization.html#VkSemaphoreCreateInfo)

The type `id` is defined in Apple’s Metal framework, but to
remove an unnecessary compile time dependency, an incomplete type definition
of `MTLSharedEvent_id` is provided in the Vulkan headers:

// Provided by VK_EXT_metal_objects
#ifdef __OBJC__
@protocol MTLSharedEvent;
typedef __unsafe_unretained id MTLSharedEvent_id;
#else
typedef void* MTLSharedEvent_id;
#endif

To import memory created outside of the current Vulkan instance from a QNX
Screen buffer, add a `VkImportScreenBufferInfoQNX` structure to the
`pNext` chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.
The `VkImportScreenBufferInfoQNX` structure is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkImportScreenBufferInfoQNX {
    VkStructureType           sType;
    const void*               pNext;
    struct _screen_buffer*    buffer;
} VkImportScreenBufferInfoQNX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is a pointer to a `struct` `_screen_buffer`, the QNX
Screen buffer to import

The implementation **may** not acquire a reference to the imported Screen
buffer.
Therefore, the application **must** ensure that the object referred to by
`buffer` stays valid as long as the device memory to which it is
imported is being used.

Valid Usage

* 
[](#VUID-VkImportScreenBufferInfoQNX-buffer-08966) VUID-VkImportScreenBufferInfoQNX-buffer-08966

If `buffer` is not `NULL`, QNX Screen Buffers **must** be supported for
import, as reported by [VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties) or
[VkExternalBufferProperties](capabilities.html#VkExternalBufferProperties)

* 
[](#VUID-VkImportScreenBufferInfoQNX-buffer-08967) VUID-VkImportScreenBufferInfoQNX-buffer-08967

`buffer` is not `NULL`, it **must** be a pointer to
[valid QNX Screen buffer](#memory-external-screen-buffer-validity)

Valid Usage (Implicit)

* 
[](#VUID-VkImportScreenBufferInfoQNX-sType-sType) VUID-VkImportScreenBufferInfoQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_SCREEN_BUFFER_INFO_QNX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To determine the memory parameters to use when importing a QNX Screen
buffer, call:

// Provided by VK_QNX_external_memory_screen_buffer
VkResult vkGetScreenBufferPropertiesQNX(
    VkDevice                                    device,
    const struct _screen_buffer*                buffer,
    VkScreenBufferPropertiesQNX*                pProperties);

* 
`device` is the logical device that will be importing `buffer`.

* 
`buffer` is the QNX Screen buffer which will be imported.

* 
`pProperties` is a pointer to a [VkScreenBufferPropertiesQNX](#VkScreenBufferPropertiesQNX)
structure in which the properties of `buffer` are returned.

Valid Usage

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-buffer-08968) VUID-vkGetScreenBufferPropertiesQNX-buffer-08968

`buffer` **must** be a [valid    QNX Screen buffer](#memory-external-screen-buffer-validity)

Valid Usage (Implicit)

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-device-parameter) VUID-vkGetScreenBufferPropertiesQNX-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-buffer-parameter) VUID-vkGetScreenBufferPropertiesQNX-buffer-parameter

 `buffer` **must** be a valid pointer to a valid `_screen_buffer` value

* 
[](#VUID-vkGetScreenBufferPropertiesQNX-pProperties-parameter) VUID-vkGetScreenBufferPropertiesQNX-pProperties-parameter

 `pProperties` **must** be a valid pointer to a [VkScreenBufferPropertiesQNX](#VkScreenBufferPropertiesQNX) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE_KHR](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkScreenBufferPropertiesQNX` structure returned is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkScreenBufferPropertiesQNX {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       allocationSize;
    uint32_t           memoryTypeBits;
} VkScreenBufferPropertiesQNX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`allocationSize` is the size of the external memory.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Screen buffer **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkScreenBufferPropertiesQNX-sType-sType) VUID-VkScreenBufferPropertiesQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SCREEN_BUFFER_PROPERTIES_QNX](fundamentals.html#VkStructureType)

* 
[](#VUID-VkScreenBufferPropertiesQNX-pNext-pNext) VUID-VkScreenBufferPropertiesQNX-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkScreenBufferFormatPropertiesQNX](#VkScreenBufferFormatPropertiesQNX)

* 
[](#VUID-VkScreenBufferPropertiesQNX-sType-unique) VUID-VkScreenBufferPropertiesQNX-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

To obtain format properties of a QNX Screen buffer, include a
`VkScreenBufferFormatPropertiesQNX` structure in the `pNext` chain
of the [VkScreenBufferPropertiesQNX](#VkScreenBufferPropertiesQNX) structure passed to
[vkGetScreenBufferPropertiesQNX](#vkGetScreenBufferPropertiesQNX).
This structure is defined as:

// Provided by VK_QNX_external_memory_screen_buffer
typedef struct VkScreenBufferFormatPropertiesQNX {
    VkStructureType                  sType;
    void*                            pNext;
    VkFormat                         format;
    uint64_t                         externalFormat;
    uint64_t                         screenUsage;
    VkFormatFeatureFlags             formatFeatures;
    VkComponentMapping               samplerYcbcrConversionComponents;
    VkSamplerYcbcrModelConversion    suggestedYcbcrModel;
    VkSamplerYcbcrRange              suggestedYcbcrRange;
    VkChromaLocation                 suggestedXChromaOffset;
    VkChromaLocation                 suggestedYChromaOffset;
} VkScreenBufferFormatPropertiesQNX;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the Vulkan format corresponding to the Screen buffer’s
format or [VK_FORMAT_UNDEFINED](formats.html#VkFormat) if there is not an equivalent Vulkan
format.

* 
`externalFormat` is an implementation-defined external format
identifier for use with [VkExternalFormatQNX](resources.html#VkExternalFormatQNX).
It **must** not be zero.

* 
`screenUsage` is an implementation-defined external usage identifier
for the QNX Screen buffer.

* 
`formatFeatures` describes the capabilities of this external format
when used with an image bound to memory imported from `buffer`.

* 
`samplerYcbcrConversionComponents` is the component swizzle that
**should** be used in [VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYcbcrModel` is a suggested color model to use in the
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYcbcrRange` is a suggested numerical value range to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedXChromaOffset` is a suggested X chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

* 
`suggestedYChromaOffset` is a suggested Y chroma offset to use in
[VkSamplerYcbcrConversionCreateInfo](samplers.html#VkSamplerYcbcrConversionCreateInfo).

If the QNX Screen buffer has one of the formats listed in the
[QNX Screen Format Equivalence table](#memory-external-qnx-screen-buffer-formats), then `format` **must** have the equivalent Vulkan format listed in
the table.
Otherwise, `format` **may** be [VK_FORMAT_UNDEFINED](formats.html#VkFormat), indicating the
QNX Screen buffer **can** only be used with an external format.
The `formatFeatures` member **must** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](formats.html#VkFormatFeatureFlagBits) and **should** include
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_FILTER_LINEAR_BIT](formats.html#VkFormatFeatureFlagBits) and
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_YCBCR_CONVERSION_LINEAR_FILTER_BIT](formats.html#VkFormatFeatureFlagBits).

Valid Usage (Implicit)

* 
[](#VUID-VkScreenBufferFormatPropertiesQNX-sType-sType) VUID-VkScreenBufferFormatPropertiesQNX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SCREEN_BUFFER_FORMAT_PROPERTIES_QNX](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkScreenBufferPropertiesQNX](#VkScreenBufferPropertiesQNX)

To import memory from a Metal handle, add a
[VkImportMemoryMetalHandleInfoEXT](#VkImportMemoryMetalHandleInfoEXT) structure to the `pNext` chain of
the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.

The `VkImportMemoryMetalHandleInfoEXT` structure is defined as:

// Provided by VK_EXT_external_memory_metal
typedef struct VkImportMemoryMetalHandleInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
    void*                                 handle;
} VkImportMemoryMetalHandleInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of `handle` or `name`.

* 
`handle` is `NULL` or the external handle to import.

Importing memory object payloads from Metal handles shares the ownership of
the handle to the Vulkan implementation.

Applications **can** import the same payload into multiple instances of Vulkan,
into the same instance from which it was exported, and multiple times into a
given Vulkan instance.
In all cases, each import operation **must** create a distinct
`VkDeviceMemory` object.

Valid Usage

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10408) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10408

If `handleType` is not `0`, it **must** be supported for import, as
reported by [VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties) or
[VkExternalBufferProperties](capabilities.html#VkExternalBufferProperties)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handle-10409) VUID-VkImportMemoryMetalHandleInfoEXT-handle-10409

The memory from which `handle` was exported **must** have been created
on the same underlying physical device as `device`

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10410) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10410

If `handleType` is not `0`, it **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10411) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-10411

If `handleType` is not `0` , `handle` **must** be a valid non-NULL
handle of the type specified by `handleType`

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handle-10412) VUID-VkImportMemoryMetalHandleInfoEXT-handle-10412

`handle` **must** obey any requirements listed for `handleType` in
[external memory handle    types compatibility](capabilities.html#external-memory-handle-types-compatibility)

Valid Usage (Implicit)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-sType-sType) VUID-VkImportMemoryMetalHandleInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMPORT_MEMORY_METAL_HANDLE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImportMemoryMetalHandleInfoEXT-handleType-parameter) VUID-VkImportMemoryMetalHandleInfoEXT-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To export a Metal handle representing the payload of a Vulkan device memory
object, call:

// Provided by VK_EXT_external_memory_metal
VkResult vkGetMemoryMetalHandleEXT(
    VkDevice                                    device,
    const VkMemoryGetMetalHandleInfoEXT*        pGetMetalHandleInfo,
    void**                                      pHandle);

* 
`device` is the logical device that created the device memory being
exported.

* 
`pGetMetalHandleInfo` is a pointer to a
[VkMemoryGetMetalHandleInfoEXT](#VkMemoryGetMetalHandleInfoEXT) structure containing parameters of
the export operation.

* 
`pHandle` will return the Metal handle representing the payload of
the device memory object.

Unless the app retains the handle object returned by the call, the lifespan
will be the same as the associated `VkDeviceMemory`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryMetalHandleEXT-device-parameter) VUID-vkGetMemoryMetalHandleEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryMetalHandleEXT-pGetMetalHandleInfo-parameter) VUID-vkGetMemoryMetalHandleEXT-pGetMetalHandleInfo-parameter

 `pGetMetalHandleInfo` **must** be a valid pointer to a valid [VkMemoryGetMetalHandleInfoEXT](#VkMemoryGetMetalHandleInfoEXT) structure

* 
[](#VUID-vkGetMemoryMetalHandleEXT-pHandle-parameter) VUID-vkGetMemoryMetalHandleEXT-pHandle-parameter

 `pHandle` **must** be a valid pointer to a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryGetMetalHandleInfoEXT` structure is defined as:

// Provided by VK_EXT_external_memory_metal
typedef struct VkMemoryGetMetalHandleInfoEXT {
    VkStructureType                       sType;
    const void*                           pNext;
    VkDeviceMemory                        memory;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkMemoryGetMetalHandleInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object from which the handle will be
exported.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of handle requested.

The properties of the handle returned depend on the value of
`handleType`.
See [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) for a description of the
properties of the defined external memory handle types.

Valid Usage

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-memory-10413) VUID-VkMemoryGetMetalHandleInfoEXT-memory-10413

`memory` **must** have been created with a valid
[VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10414) VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10414

`handleType` **must** have been included in
[VkExportMemoryAllocateInfo](#VkExportMemoryAllocateInfo)::`handleTypes` when `memory`
was created

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10415) VUID-VkMemoryGetMetalHandleInfoEXT-handleType-10415

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-sType-sType) VUID-VkMemoryGetMetalHandleInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_GET_METAL_HANDLE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-pNext-pNext) VUID-VkMemoryGetMetalHandleInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-memory-parameter) VUID-VkMemoryGetMetalHandleInfoEXT-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-VkMemoryGetMetalHandleInfoEXT-handleType-parameter) VUID-VkMemoryGetMetalHandleInfoEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

Metal memory handles compatible with Vulkan **may** also be created by
non-Vulkan APIs using methods beyond the scope of this specification.
To determine the correct parameters to use when importing such handles,
call:

// Provided by VK_EXT_external_memory_metal
VkResult vkGetMemoryMetalHandlePropertiesEXT(
    VkDevice                                    device,
    VkExternalMemoryHandleTypeFlagBits          handleType,
    const void*                                 pHandle,
    VkMemoryMetalHandlePropertiesEXT*           pMemoryMetalHandleProperties);

* 
`device` is the logical device that will be importing `pHandle`.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value
specifying the type of the handle `pHandle`.

* 
`pHandle` is the handle which will be imported.

* 
`pMemoryMetalHandleProperties` is a pointer to a
[VkMemoryMetalHandlePropertiesEXT](#VkMemoryMetalHandlePropertiesEXT) structure in which properties of
`pHandle` are returned.

Valid Usage

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-handle-10416) VUID-vkGetMemoryMetalHandlePropertiesEXT-handle-10416

`pHandle` **must** point to a valid id, id or
id

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-10417) VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-10417

`handleType` **must** be
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLBUFFER_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR),
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLTEXTURE_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_MTLHEAP_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-device-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-handleType-parameter

 `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](capabilities.html#VkExternalMemoryHandleTypeFlagBits) value

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-pHandle-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-pHandle-parameter

 `pHandle` **must** be a pointer value

* 
[](#VUID-vkGetMemoryMetalHandlePropertiesEXT-pMemoryMetalHandleProperties-parameter) VUID-vkGetMemoryMetalHandlePropertiesEXT-pMemoryMetalHandleProperties-parameter

 `pMemoryMetalHandleProperties` **must** be a valid pointer to a [VkMemoryMetalHandlePropertiesEXT](#VkMemoryMetalHandlePropertiesEXT) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INVALID_EXTERNAL_HANDLE](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryMetalHandlePropertiesEXT` structure returned is defined as:

// Provided by VK_EXT_external_memory_metal
typedef struct VkMemoryMetalHandlePropertiesEXT {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           memoryTypeBits;
} VkMemoryMetalHandlePropertiesEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memoryTypeBits` is a bitmask containing one bit set for every
memory type which the specified Metal handle **can** be imported as.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryMetalHandlePropertiesEXT-sType-sType) VUID-VkMemoryMetalHandlePropertiesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_METAL_HANDLE_PROPERTIES_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryMetalHandlePropertiesEXT-pNext-pNext) VUID-VkMemoryMetalHandlePropertiesEXT-pNext-pNext

 `pNext` **must** be `NULL`

If the `pNext` chain of [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) includes a
`VkMemoryAllocateFlagsInfo` structure, then that structure includes
flags and a device mask controlling how many instances of the memory will be
allocated.

The `VkMemoryAllocateFlagsInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkMemoryAllocateFlagsInfo {
    VkStructureType          sType;
    const void*              pNext;
    VkMemoryAllocateFlags    flags;
    uint32_t                 deviceMask;
} VkMemoryAllocateFlagsInfo;

// Provided by VK_KHR_device_group
// Equivalent to VkMemoryAllocateFlagsInfo
typedef VkMemoryAllocateFlagsInfo VkMemoryAllocateFlagsInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkMemoryAllocateFlagBits](#VkMemoryAllocateFlagBits) controlling
the allocation.

* 
`deviceMask` is a mask of physical devices in the logical device,
indicating that memory **must** be allocated on each device in the mask, if
[VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](#VkMemoryAllocateFlagBitsKHR) is set in `flags`.

If [VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](#VkMemoryAllocateFlagBitsKHR) is not set, the number of
instances allocated depends on whether
[VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](#VkMemoryHeapFlagBits) is set in the memory heap.
If [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](#VkMemoryHeapFlagBits) is set, then memory is allocated
for every physical device in the logical device (as if `deviceMask` has
bits set for all device indices).
If [VK_MEMORY_HEAP_MULTI_INSTANCE_BIT](#VkMemoryHeapFlagBits) is not set, then a single
instance of memory is allocated (as if `deviceMask` is set to one).

On some implementations, allocations from a multi-instance heap **may** consume
memory on all physical devices even if the `deviceMask` excludes some
devices.
If [VkPhysicalDeviceGroupProperties](devsandqueues.html#VkPhysicalDeviceGroupProperties)::`subsetAllocation` is
[VK_TRUE](fundamentals.html#VK_TRUE), then memory is only consumed for the devices in the device
mask.

|  | In practice, most allocations on a multi-instance heap will be allocated
| --- | --- |
across all physical devices.
Unicast allocation support is an optional optimization for a minority of
allocations. |

Valid Usage

* 
[](#VUID-VkMemoryAllocateFlagsInfo-deviceMask-00675) VUID-VkMemoryAllocateFlagsInfo-deviceMask-00675

If [VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](#VkMemoryAllocateFlagBitsKHR) is set, `deviceMask`
**must** be a valid device mask

* 
[](#VUID-VkMemoryAllocateFlagsInfo-deviceMask-00676) VUID-VkMemoryAllocateFlagsInfo-deviceMask-00676

If [VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](#VkMemoryAllocateFlagBitsKHR) is set, `deviceMask`
**must** not be zero

* 
[](#VUID-VkMemoryAllocateFlagsInfo-flags-10760) VUID-VkMemoryAllocateFlagsInfo-flags-10760

If the allocation is performing a memory import operation, then
`flags` **must** not contain
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](#VkMemoryAllocateFlagBitsKHR)

* 
[](#VUID-VkMemoryAllocateFlagsInfo-flags-10761) VUID-VkMemoryAllocateFlagsInfo-flags-10761

If the allocation uses protected memory, then `flags` **must** not
contain [VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](#VkMemoryAllocateFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryAllocateFlagsInfo-sType-sType) VUID-VkMemoryAllocateFlagsInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_ALLOCATE_FLAGS_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryAllocateFlagsInfo-flags-parameter) VUID-VkMemoryAllocateFlagsInfo-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryAllocateFlagBits](#VkMemoryAllocateFlagBits) values

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

Bits which **can** be set in [VkMemoryAllocateFlagsInfo](#VkMemoryAllocateFlagsInfo)::`flags`,
controlling device memory allocation, are:

// Provided by VK_VERSION_1_1
typedef enum VkMemoryAllocateFlagBits {
    VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT = 0x00000001,
  // Provided by VK_VERSION_1_2
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT = 0x00000002,
  // Provided by VK_VERSION_1_2
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT = 0x00000004,
  // Provided by VK_EXT_zero_initialize_device_memory
    VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT = 0x00000008,
  // Provided by VK_KHR_device_group
    VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT_KHR = VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT,
  // Provided by VK_KHR_buffer_device_address
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT_KHR = VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT,
  // Provided by VK_KHR_buffer_device_address
    VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT_KHR = VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT,
} VkMemoryAllocateFlagBits;

// Provided by VK_KHR_device_group
// Equivalent to VkMemoryAllocateFlagBits
typedef VkMemoryAllocateFlagBits VkMemoryAllocateFlagBitsKHR;

* 
[VK_MEMORY_ALLOCATE_DEVICE_MASK_BIT](#VkMemoryAllocateFlagBitsKHR) specifies that memory will be
allocated for the devices in
[VkMemoryAllocateFlagsInfo](#VkMemoryAllocateFlagsInfo)::`deviceMask`.

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](#VkMemoryAllocateFlagBitsKHR) specifies that the memory
**can** be attached to a buffer object created with the
[VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT](resources.html#VkBufferUsageFlagBits) usage flag set.

* 
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkMemoryAllocateFlagBitsKHR) specifies
that the memory’s address **can** be saved and reused on a subsequent run
(e.g. for trace capture and replay), see
[VkBufferOpaqueCaptureAddressCreateInfo](resources.html#VkBufferOpaqueCaptureAddressCreateInfo) for more detail.
If this bit is set, [VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](#VkMemoryAllocateFlagBitsKHR) **must**
also be set.

* 
[VK_MEMORY_ALLOCATE_ZERO_INITIALIZE_BIT_EXT](#VkMemoryAllocateFlagBitsKHR) specifies that the
memory will be zeroed automatically by the implementation before
application is able to access it.

// Provided by VK_VERSION_1_1
typedef VkFlags VkMemoryAllocateFlags;

// Provided by VK_KHR_device_group
// Equivalent to VkMemoryAllocateFlags
typedef VkMemoryAllocateFlags VkMemoryAllocateFlagsKHR;

`VkMemoryAllocateFlags` is a bitmask type for setting a mask of zero or
more [VkMemoryAllocateFlagBits](#VkMemoryAllocateFlagBits).

To request a specific device address for a memory allocation, add a
[VkMemoryOpaqueCaptureAddressAllocateInfo](#VkMemoryOpaqueCaptureAddressAllocateInfo) structure to the `pNext`
chain of the [VkMemoryAllocateInfo](#VkMemoryAllocateInfo) structure.
The `VkMemoryOpaqueCaptureAddressAllocateInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkMemoryOpaqueCaptureAddressAllocateInfo {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           opaqueCaptureAddress;
} VkMemoryOpaqueCaptureAddressAllocateInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkMemoryOpaqueCaptureAddressAllocateInfo
typedef VkMemoryOpaqueCaptureAddressAllocateInfo VkMemoryOpaqueCaptureAddressAllocateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`opaqueCaptureAddress` is the opaque capture address requested for
the memory allocation.

If `opaqueCaptureAddress` is zero, no specific address is requested.

If `opaqueCaptureAddress` is not zero, it **should** be an address
retrieved from [vkGetDeviceMemoryOpaqueCaptureAddress](#vkGetDeviceMemoryOpaqueCaptureAddress) on an identically
created memory allocation on the same implementation.

|  | In most cases, it is expected that a non-zero `opaqueAddress` is an
| --- | --- |
address retrieved from [vkGetDeviceMemoryOpaqueCaptureAddress](#vkGetDeviceMemoryOpaqueCaptureAddress) on an
identically created memory allocation.
If this is not the case, it is likely that
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult) errors will occur.

This is, however, not a strict requirement because trace capture/replay
tools may need to adjust memory allocation parameters for imported memory. |

If this structure is not present, it is as if `opaqueCaptureAddress` is
zero.

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryOpaqueCaptureAddressAllocateInfo-sType-sType) VUID-VkMemoryOpaqueCaptureAddressAllocateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_OPAQUE_CAPTURE_ADDRESS_ALLOCATE_INFO](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo)

To free a memory object, call:

// Provided by VK_VERSION_1_0
void vkFreeMemory(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](#VkDeviceMemory) object to be freed.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](#memory-allocation) chapter.

Before freeing a memory object, an application **must** ensure the memory
object is no longer in use by the device — for example by command buffers
in the *pending state*.
Memory **can** be freed whilst still bound to resources, but those resources
**must** not be used afterwards.
Freeing a memory object releases the reference it held, if any, to its
payload.
If there are still any bound images or buffers, the memory object’s payload
**may** not be immediately released by the implementation, but **must** be
released by the time all bound images and buffers have been destroyed.
Once all references to a payload are released, it is returned to the heap
from which it was allocated.

How memory objects are bound to Images and Buffers is described in detail in
the [Resource Memory Association](resources.html#resources-association) section.

If a memory object is mapped at the time it is freed, it is implicitly
unmapped.

|  | As described [below](#memory-device-unmap-does-not-flush), host writes are
| --- | --- |
not implicitly flushed when the memory object is unmapped, but the
implementation **must** guarantee that writes that have not been flushed do not
affect any other memory. |

Valid Usage

* 
[](#VUID-vkFreeMemory-memory-00677) VUID-vkFreeMemory-memory-00677

All submitted commands that refer to `memory` (via images or
buffers) **must** have completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkFreeMemory-device-parameter) VUID-vkFreeMemory-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkFreeMemory-memory-parameter) VUID-vkFreeMemory-memory-parameter

 If `memory` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-vkFreeMemory-pAllocator-parameter) VUID-vkFreeMemory-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](#VkAllocationCallbacks) structure

* 
[](#VUID-vkFreeMemory-memory-parent) VUID-vkFreeMemory-memory-parent

 If `memory` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

Memory objects created with [vkAllocateMemory](#vkAllocateMemory) are not directly host
accessible.

Memory objects created with the memory property
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits) are considered *mappable*.
Memory objects **must** be mappable in order to be successfully mapped on the
host.

To retrieve a host virtual address pointer to a region of a mappable memory
object, call:

// Provided by VK_VERSION_1_0
VkResult vkMapMemory(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    VkDeviceSize                                offset,
    VkDeviceSize                                size,
    VkMemoryMapFlags                            flags,
    void**                                      ppData);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](#VkDeviceMemory) object to be mapped.

* 
`offset` is a zero-based byte offset from the beginning of the
memory object.

* 
`size` is the size of the memory range to map, or
[VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) to map from `offset` to the end of the
allocation.

* 
`flags` is a bitmask of [VkMemoryMapFlagBits](#VkMemoryMapFlagBits) specifying
additional parameters of the memory map operation.

* 
`ppData` is a pointer to a `void*` variable in which a
host-accessible pointer to the beginning of the mapped range is
returned.
The value of the returned pointer minus `offset` **must** be aligned to
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`minMemoryMapAlignment`.

After a successful call to `vkMapMemory` the memory object `memory`
is considered to be currently *host mapped*.

|  | It is an application error to call `vkMapMemory` on a memory object that
| --- | --- |
is already *host mapped*. |

|  | `vkMapMemory` will fail if the implementation is unable to allocate an
| --- | --- |
appropriately sized contiguous virtual address range, e.g. due to virtual
address space fragmentation or platform limits.
In such cases, `vkMapMemory` **must** return
[VK_ERROR_MEMORY_MAP_FAILED](fundamentals.html#VkResult).
The application **can** improve the likelihood of success by reducing the size
of the mapped range and/or removing unneeded mappings using
[vkUnmapMemory](#vkUnmapMemory). |

`vkMapMemory` does not check whether the device memory is currently in
use before returning the host-accessible pointer.
The application **must** guarantee that any previously submitted command that
writes to this range has completed before the host reads from or writes to
that range, and that any previously submitted command that reads from that
range has completed before the host writes to that region (see
[here](synchronization.html#synchronization-submission-host-writes) for details on fulfilling
such a guarantee).
If the device memory was allocated without the
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) set, these guarantees **must** be
made for an extended range: the application **must** round down the start of
the range to the nearest multiple of
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`nonCoherentAtomSize`, and round the end
of the range up to the nearest multiple of
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`nonCoherentAtomSize`.

While a range of device memory is host mapped, the application is
responsible for synchronizing both device and host access to that memory
range.

|  | It is important for the application developer to become meticulously
| --- | --- |
familiar with all of the mechanisms described in the chapter on
[Synchronization and Cache Control](synchronization.html#synchronization) as they are crucial
to maintaining memory access ordering. |

Calling `vkMapMemory` is equivalent to calling [vkMapMemory2](#vkMapMemory2) with
an empty `pNext` chain.

Valid Usage

* 
[](#VUID-vkMapMemory-memory-00678) VUID-vkMapMemory-memory-00678

`memory` **must** not be currently host mapped

* 
[](#VUID-vkMapMemory-offset-00679) VUID-vkMapMemory-offset-00679

`offset` **must** be less than the size of `memory`

* 
[](#VUID-vkMapMemory-size-00680) VUID-vkMapMemory-size-00680

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be
greater than `0`

* 
[](#VUID-vkMapMemory-size-00681) VUID-vkMapMemory-size-00681

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be
less than or equal to the size of the `memory` minus `offset`

* 
[](#VUID-vkMapMemory-memory-00682) VUID-vkMapMemory-memory-00682

`memory` **must** have been created with a memory type that reports
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits)

* 
[](#VUID-vkMapMemory-memory-00683) VUID-vkMapMemory-memory-00683

`memory` **must** not have been allocated with multiple instances

* 
[](#VUID-vkMapMemory-flags-09568) VUID-vkMapMemory-flags-09568

[VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) **must** not be set in `flags`

Valid Usage (Implicit)

* 
[](#VUID-vkMapMemory-device-parameter) VUID-vkMapMemory-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkMapMemory-memory-parameter) VUID-vkMapMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-vkMapMemory-flags-parameter) VUID-vkMapMemory-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryMapFlagBits](#VkMemoryMapFlagBits) values

* 
[](#VUID-vkMapMemory-ppData-parameter) VUID-vkMapMemory-ppData-parameter

 `ppData` **must** be a valid pointer to a pointer value

* 
[](#VUID-vkMapMemory-memory-parent) VUID-vkMapMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_MEMORY_MAP_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Bits which **can** be set in [vkMapMemory](#vkMapMemory)::`flags` and
[VkMemoryMapInfo](#VkMemoryMapInfo)::`flags`, specifying additional properties of a
memory map, are:

// Provided by VK_VERSION_1_0
typedef enum VkMemoryMapFlagBits {
  // Provided by VK_EXT_map_memory_placed
    VK_MEMORY_MAP_PLACED_BIT_EXT = 0x00000001,
} VkMemoryMapFlagBits;

* 
[VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) requests that the implementation
place the memory map at the virtual address specified by the application
via [VkMemoryMapPlacedInfoEXT](#VkMemoryMapPlacedInfoEXT)::`pPlacedAddress`, replacing any
existing mapping at that address.
This flag **must** not be used with [vkMapMemory](#vkMapMemory) as there is no way to
specify the placement address.

// Provided by VK_VERSION_1_0
typedef VkFlags VkMemoryMapFlags;

`VkMemoryMapFlags` is a bitmask type for setting a mask of zero or more
[VkMemoryMapFlagBits](#VkMemoryMapFlagBits).

To retrieve a host virtual address pointer to a region of a mappable memory
object, call:

// Provided by VK_VERSION_1_4
VkResult vkMapMemory2(
    VkDevice                                    device,
    const VkMemoryMapInfo*                      pMemoryMapInfo,
    void**                                      ppData);

// Provided by VK_KHR_map_memory2
// Equivalent to vkMapMemory2
VkResult vkMapMemory2KHR(
    VkDevice                                    device,
    const VkMemoryMapInfo*                      pMemoryMapInfo,
    void**                                      ppData);

* 
`device` is the logical device that owns the memory.

* 
`pMemoryMapInfo` is a pointer to a [VkMemoryMapInfo](#VkMemoryMapInfo) structure
describing parameters of the map.

* 
`ppData` is a pointer to a `void *` variable in which is returned a
host-accessible pointer to the beginning of the mapped range.
This pointer minus [VkMemoryMapInfo](#VkMemoryMapInfo)::`offset` **must** be aligned
to at least [VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`minMemoryMapAlignment`.

This function behaves identically to [vkMapMemory](#vkMapMemory) except that it gets
its parameters via an extensible structure pointer rather than directly as
function arguments.

Valid Usage (Implicit)

* 
[](#VUID-vkMapMemory2-device-parameter) VUID-vkMapMemory2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkMapMemory2-pMemoryMapInfo-parameter) VUID-vkMapMemory2-pMemoryMapInfo-parameter

 `pMemoryMapInfo` **must** be a valid pointer to a valid [VkMemoryMapInfo](#VkMemoryMapInfo) structure

* 
[](#VUID-vkMapMemory2-ppData-parameter) VUID-vkMapMemory2-ppData-parameter

 `ppData` **must** be a valid pointer to a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_MEMORY_MAP_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryMapInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkMemoryMapInfo {
    VkStructureType     sType;
    const void*         pNext;
    VkMemoryMapFlags    flags;
    VkDeviceMemory      memory;
    VkDeviceSize        offset;
    VkDeviceSize        size;
} VkMemoryMapInfo;

// Provided by VK_KHR_map_memory2
// Equivalent to VkMemoryMapInfo
typedef VkMemoryMapInfo VkMemoryMapInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkMemoryMapFlagBits](#VkMemoryMapFlagBits) specifying
additional parameters of the memory map operation.

* 
`memory` is the [VkDeviceMemory](#VkDeviceMemory) object to be mapped.

* 
`offset` is a zero-based byte offset from the beginning of the
memory object.

* 
`size` is the size of the memory range to map, or
[VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) to map from `offset` to the end of the
allocation.

Valid Usage

* 
[](#VUID-VkMemoryMapInfo-memory-07958) VUID-VkMemoryMapInfo-memory-07958

`memory` **must** not be currently host mapped

* 
[](#VUID-VkMemoryMapInfo-offset-07959) VUID-VkMemoryMapInfo-offset-07959

`offset` **must** be less than the size of `memory`

* 
[](#VUID-VkMemoryMapInfo-size-07960) VUID-VkMemoryMapInfo-size-07960

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be
greater than `0`

* 
[](#VUID-VkMemoryMapInfo-size-07961) VUID-VkMemoryMapInfo-size-07961

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be
less than or equal to the size of the `memory` minus `offset`

* 
[](#VUID-VkMemoryMapInfo-memory-07962) VUID-VkMemoryMapInfo-memory-07962

`memory` **must** have been created with a memory type that reports
[VK_MEMORY_PROPERTY_HOST_VISIBLE_BIT](#VkMemoryPropertyFlagBits)

* 
[](#VUID-VkMemoryMapInfo-memory-07963) VUID-VkMemoryMapInfo-memory-07963

`memory` **must** not have been allocated with multiple instances

* 
[](#VUID-VkMemoryMapInfo-flags-09569) VUID-VkMemoryMapInfo-flags-09569

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags`, the
[`memoryMapPlaced`](features.html#features-memoryMapPlaced) feature **must** be
enabled

* 
[](#VUID-VkMemoryMapInfo-flags-09570) VUID-VkMemoryMapInfo-flags-09570

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags`, the
`pNext` chain **must** include a [VkMemoryMapPlacedInfoEXT](#VkMemoryMapPlacedInfoEXT)
structure and `VkMemoryMapPlacedInfoEXT`::`pPlacedAddress` **must**
not be `NULL`

* 
[](#VUID-VkMemoryMapInfo-flags-09571) VUID-VkMemoryMapInfo-flags-09571

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags` and the
[`memoryMapRangePlaced`](features.html#features-memoryMapRangePlaced) feature is
not enabled, `offset` **must** be zero

* 
[](#VUID-VkMemoryMapInfo-flags-09572) VUID-VkMemoryMapInfo-flags-09572

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags` and the
[`memoryMapRangePlaced`](features.html#features-memoryMapRangePlaced) feature is
not enabled, `size` **must** be [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) or
`VkMemoryAllocateInfo`::`allocationSize`

* 
[](#VUID-VkMemoryMapInfo-flags-09573) VUID-VkMemoryMapInfo-flags-09573

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags` and the
[`memoryMapRangePlaced`](features.html#features-memoryMapRangePlaced) feature is
enabled, `offset` **must** be aligned to an integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapInfo-flags-09574) VUID-VkMemoryMapInfo-flags-09574

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags` and
`size` is not [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must** be aligned to an
integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapInfo-flags-09651) VUID-VkMemoryMapInfo-flags-09651

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags` and
`size` is [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE),
`VkMemoryAllocateInfo`::`allocationSize` **must** be aligned to an
integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapInfo-flags-09575) VUID-VkMemoryMapInfo-flags-09575

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in `flags`, the memory
object **must** not have been imported from a handle type of
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryMapInfo-sType-sType) VUID-VkMemoryMapInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_MAP_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryMapInfo-pNext-pNext) VUID-VkMemoryMapInfo-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkMemoryMapPlacedInfoEXT](#VkMemoryMapPlacedInfoEXT)

* 
[](#VUID-VkMemoryMapInfo-sType-unique) VUID-VkMemoryMapInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkMemoryMapInfo-flags-parameter) VUID-VkMemoryMapInfo-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryMapFlagBits](#VkMemoryMapFlagBits) values

* 
[](#VUID-VkMemoryMapInfo-memory-parameter) VUID-VkMemoryMapInfo-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

If [VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits) is set in
`VkMemoryMapInfo`::`flags` and the `pNext` chain of
[VkMemoryMapInfo](#VkMemoryMapInfo) includes a `VkMemoryMapPlacedInfoEXT` structure,
then that structure specifies the placement address of the memory map.
The implementation will place the memory map at the specified address,
replacing any existing maps in the specified memory range.
Replacing memory maps in this way does not implicitly unmap Vulkan memory
objects.
Instead, the application **must** ensure no other Vulkan memory objects are
mapped anywhere in the specified virtual address range.
If successful, `ppData` will be set to the same value as
`VkMemoryMapPlacedInfoEXT`::`pPlacedAddress` and `vkMapMemory2`
will return [VK_SUCCESS](fundamentals.html#VkResult).
If it cannot place the map at the requested address for any reason, the
memory object is left unmapped and `vkMapMemory2` will return
[VK_ERROR_MEMORY_MAP_FAILED](fundamentals.html#VkResult).

The `VkMemoryMapPlacedInfoEXT` structure is defined as:

// Provided by VK_EXT_map_memory_placed
typedef struct VkMemoryMapPlacedInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    void*              pPlacedAddress;
} VkMemoryMapPlacedInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pPlacedAddress` is the virtual address at which to place the
address.
If `VkMemoryMapInfo`::`flags` does not contain
[VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits), this value is ignored.

Valid Usage

* 
[](#VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09577) VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09577

`pPlacedAddress` **must** be aligned to an integer multiple of
`VkPhysicalDeviceMapMemoryPlacedPropertiesEXT`::`minPlacedMemoryMapAlignment`

* 
[](#VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09578) VUID-VkMemoryMapPlacedInfoEXT-pPlacedAddress-09578

The address range specified by `pPlacedAddress` and
`VkMemoryMapInfo`::`size` **must** not overlap any existing Vulkan
memory object mapping

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryMapPlacedInfoEXT-sType-sType) VUID-VkMemoryMapPlacedInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_MAP_PLACED_INFO_EXT](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkMemoryMapInfo](#VkMemoryMapInfo)

Two commands are provided to enable applications to work with non-coherent
memory allocations: `vkFlushMappedMemoryRanges` and
`vkInvalidateMappedMemoryRanges`.

|  | If the memory object was created with the
| --- | --- |
[VK_MEMORY_PROPERTY_HOST_COHERENT_BIT](#VkMemoryPropertyFlagBits) set,
`vkFlushMappedMemoryRanges` and `vkInvalidateMappedMemoryRanges` are
unnecessary and **may** have a performance cost.
However, [availability and visibility operations](synchronization.html#synchronization-dependencies-available-and-visible) still need to be managed on the device.
See the description of [host access types](synchronization.html#synchronization-host-access-types) for more information. |

|  | While memory objects imported from a handle type of
| --- | --- |
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) are
inherently mapped to host address space, they are not considered to be host
mapped device memory unless they are explicitly host mapped using
[vkMapMemory](#vkMapMemory).
That means flushing or invalidating host caches with respect to host
accesses performed on such memory through the original host pointer
specified at import time is the responsibility of the application and **must**
be performed with appropriate synchronization primitives provided by the
platform which are outside the scope of Vulkan.
`vkFlushMappedMemoryRanges` and `vkInvalidateMappedMemoryRanges`,
however, **can** still be used on such memory objects to synchronize host
accesses performed through the host pointer of the host mapped device memory
range returned by [vkMapMemory](#vkMapMemory). |

After a successful call to `vkMapMemory`
or `vkMapMemory2`
the memory object `memory` is considered to be currently *host mapped*.

To flush ranges of non-coherent memory from the host caches, call:

// Provided by VK_VERSION_1_0
VkResult vkFlushMappedMemoryRanges(
    VkDevice                                    device,
    uint32_t                                    memoryRangeCount,
    const VkMappedMemoryRange*                  pMemoryRanges);

* 
`device` is the logical device that owns the memory ranges.

* 
`memoryRangeCount` is the length of the `pMemoryRanges` array.

* 
`pMemoryRanges` is a pointer to an array of
[VkMappedMemoryRange](#VkMappedMemoryRange) structures describing the memory ranges to
flush.

`vkFlushMappedMemoryRanges` guarantees that host writes to the memory
ranges described by `pMemoryRanges` are made available to the host
memory domain, such that they **can** be made available to the device memory
domain via [memory domain operations](synchronization.html#synchronization-dependencies-available-and-visible) using the [VK_ACCESS_HOST_WRITE_BIT](synchronization.html#VkAccessFlagBits)
[access type](synchronization.html#synchronization-access-types).

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all host operations that happened-before it, as defined by the host
memory model.

|  | Some systems allow writes that do not directly integrate with the host
| --- | --- |
memory model; these have to be synchronized by the application manually.
One example of this is non-temporal store instructions on x86; to ensure
these happen-before submission, applications should call `_mm_sfence()`. |

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes) is
empty.

The first [access scope](synchronization.html#synchronization-dependencies-access-scopes)
includes host writes to the specified memory ranges.

|  | When a host write to a memory location is made available in this way, each
| --- | --- |
whole aligned set of [`nonCoherentAtomSize`](limits.html#limits-nonCoherentAtomSize) bytes that the memory location exists in will
also be made available as if they were written by the host.
For example, with a `nonCoherentAtomSize` of 128, if an application
writes to the first byte of a memory object via a host mapping, the first
128 bytes of the memory object will be made available by this command.
While the value of the following 127 bytes will be unchanged, this does
count as an access for the purpose of synchronization, so care must be taken
to avoid data races. |

The second [access scope](synchronization.html#synchronization-dependencies-access-scopes) is
empty.

Unmapping non-coherent memory does not implicitly flush the host mapped
memory, and host writes that have not been flushed **may** not ever be visible
to the device.
However, implementations **must** ensure that writes that have not been flushed
do not become visible to any other memory.

|  | The above guarantee avoids a potential memory corruption in scenarios where
| --- | --- |
host writes to a mapped memory object have not been flushed before the
memory is unmapped (or freed), and the virtual address range is subsequently
reused for a different mapping (or memory allocation). |

Valid Usage (Implicit)

* 
[](#VUID-vkFlushMappedMemoryRanges-device-parameter) VUID-vkFlushMappedMemoryRanges-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkFlushMappedMemoryRanges-pMemoryRanges-parameter) VUID-vkFlushMappedMemoryRanges-pMemoryRanges-parameter

 `pMemoryRanges` **must** be a valid pointer to an array of `memoryRangeCount` valid [VkMappedMemoryRange](#VkMappedMemoryRange) structures

* 
[](#VUID-vkFlushMappedMemoryRanges-memoryRangeCount-arraylength) VUID-vkFlushMappedMemoryRanges-memoryRangeCount-arraylength

 `memoryRangeCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To invalidate ranges of non-coherent memory from the host caches, call:

// Provided by VK_VERSION_1_0
VkResult vkInvalidateMappedMemoryRanges(
    VkDevice                                    device,
    uint32_t                                    memoryRangeCount,
    const VkMappedMemoryRange*                  pMemoryRanges);

* 
`device` is the logical device that owns the memory ranges.

* 
`memoryRangeCount` is the length of the `pMemoryRanges` array.

* 
`pMemoryRanges` is a pointer to an array of
[VkMappedMemoryRange](#VkMappedMemoryRange) structures describing the memory ranges to
invalidate.

`vkInvalidateMappedMemoryRanges` guarantees that device writes to the
memory ranges described by `pMemoryRanges`, which have been made
available to the host memory domain using the [VK_ACCESS_HOST_WRITE_BIT](synchronization.html#VkAccessFlagBits)
and [VK_ACCESS_HOST_READ_BIT](synchronization.html#VkAccessFlagBits) [access types](synchronization.html#synchronization-access-types), are made visible to the host.
If a range of non-coherent memory is written by the host and then
invalidated without first being flushed, its contents are **undefined**.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all host operations that happened-before it, as defined by the host
memory model.

|  | This function does not synchronize with device operations directly - other
| --- | --- |
host [synchronization operations](synchronization.html#synchronization) that depend on device
operations such as [vkWaitForFences](synchronization.html#vkWaitForFences) must be executed beforehand.
So for any non-coherent device write to be made visible to the host, there
has to be a dependency chain along the following lines:

Device write

Device memory barrier including host reads in its second scope

Signal on the device (e.g. a [fence    signal operation](synchronization.html#synchronization-fences-signaling))

Wait on the host (e.g. [vkWaitForFences](synchronization.html#vkWaitForFences))

[vkInvalidateMappedMemoryRanges](#vkInvalidateMappedMemoryRanges) |

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all host operations that happen-after it, as defined by the host
memory model.

The first [access scope](synchronization.html#synchronization-dependencies-access-scopes) is
empty.

The second [access scope](synchronization.html#synchronization-dependencies-access-scopes)
includes host reads to the specified memory ranges.

|  | When a device write to a memory location is made visible to the host in this
| --- | --- |
way, each whole aligned set of [`nonCoherentAtomSize`](limits.html#limits-nonCoherentAtomSize) bytes that the memory location exists in will
also be made visible as if they were written by the device.
For example, with a `nonCoherentAtomSize` of 128, if an application
writes to the first byte of a memory object on the device, the first 128
bytes of the memory object will be made visible by this command.
While the value of the following 127 bytes will be unchanged, this does
count as an access for the purpose of synchronization, so care must be taken
to avoid data races. |

|  | Mapping non-coherent memory does not implicitly invalidate that memory. |
| --- | --- |

Valid Usage (Implicit)

* 
[](#VUID-vkInvalidateMappedMemoryRanges-device-parameter) VUID-vkInvalidateMappedMemoryRanges-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkInvalidateMappedMemoryRanges-pMemoryRanges-parameter) VUID-vkInvalidateMappedMemoryRanges-pMemoryRanges-parameter

 `pMemoryRanges` **must** be a valid pointer to an array of `memoryRangeCount` valid [VkMappedMemoryRange](#VkMappedMemoryRange) structures

* 
[](#VUID-vkInvalidateMappedMemoryRanges-memoryRangeCount-arraylength) VUID-vkInvalidateMappedMemoryRanges-memoryRangeCount-arraylength

 `memoryRangeCount` **must** be greater than `0`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMappedMemoryRange` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkMappedMemoryRange {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
    VkDeviceSize       offset;
    VkDeviceSize       size;
} VkMappedMemoryRange;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` is the memory object to which this range belongs.

* 
`offset` is the zero-based byte offset from the beginning of the
memory object.

* 
`size` is either the size of range, or [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE) to affect
the range from `offset` to the end of the current mapping of the
allocation.

Valid Usage

* 
[](#VUID-VkMappedMemoryRange-memory-00684) VUID-VkMappedMemoryRange-memory-00684

`memory` **must** be currently host mapped

* 
[](#VUID-VkMappedMemoryRange-size-00685) VUID-VkMappedMemoryRange-size-00685

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `offset` and
`size` **must** specify a range contained within the currently mapped
range of `memory`

* 
[](#VUID-VkMappedMemoryRange-size-00686) VUID-VkMappedMemoryRange-size-00686

If `size` is equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `offset` **must** be
within the currently mapped range of `memory`

* 
[](#VUID-VkMappedMemoryRange-offset-00687) VUID-VkMappedMemoryRange-offset-00687

`offset` **must** be a multiple of
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`nonCoherentAtomSize`

* 
[](#VUID-VkMappedMemoryRange-size-01389) VUID-VkMappedMemoryRange-size-01389

If `size` is equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), the end of the current
mapping of `memory` **must** either be a multiple of
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`nonCoherentAtomSize` bytes from the
beginning of the memory object, or be equal to the end of the memory
object

* 
[](#VUID-VkMappedMemoryRange-size-01390) VUID-VkMappedMemoryRange-size-01390

If `size` is not equal to [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE), `size` **must**
either be a multiple of
[VkPhysicalDeviceLimits](limits.html#VkPhysicalDeviceLimits)::`nonCoherentAtomSize`, or `offset`
plus `size` **must** equal the size of `memory`

Valid Usage (Implicit)

* 
[](#VUID-VkMappedMemoryRange-sType-sType) VUID-VkMappedMemoryRange-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MAPPED_MEMORY_RANGE](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMappedMemoryRange-pNext-pNext) VUID-VkMappedMemoryRange-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMappedMemoryRange-memory-parameter) VUID-VkMappedMemoryRange-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

To unmap a memory object once host access to it is no longer needed by the
application, call:

// Provided by VK_VERSION_1_0
void vkUnmapMemory(
    VkDevice                                    device,
    VkDeviceMemory                              memory);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the memory object to be unmapped.

Calling `vkUnmapMemory` is equivalent to calling [vkUnmapMemory2](#vkUnmapMemory2)
with an empty `pNext` chain and `flags` set to zero.

Valid Usage

* 
[](#VUID-vkUnmapMemory-memory-00689) VUID-vkUnmapMemory-memory-00689

`memory` **must** be currently host mapped

Valid Usage (Implicit)

* 
[](#VUID-vkUnmapMemory-device-parameter) VUID-vkUnmapMemory-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkUnmapMemory-memory-parameter) VUID-vkUnmapMemory-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-vkUnmapMemory-memory-parent) VUID-vkUnmapMemory-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

To unmap a memory object once host access to it is no longer needed by the
application, call:

// Provided by VK_VERSION_1_4
VkResult vkUnmapMemory2(
    VkDevice                                    device,
    const VkMemoryUnmapInfo*                    pMemoryUnmapInfo);

// Provided by VK_KHR_map_memory2
// Equivalent to vkUnmapMemory2
VkResult vkUnmapMemory2KHR(
    VkDevice                                    device,
    const VkMemoryUnmapInfo*                    pMemoryUnmapInfo);

* 
`device` is the logical device that owns the memory.

* 
`pMemoryUnmapInfo` is a pointer to a [VkMemoryUnmapInfo](#VkMemoryUnmapInfo)
structure describing parameters of the unmap.

This function behaves identically to [vkUnmapMemory](#vkUnmapMemory) except that it gets
its parameters via an extensible structure pointer rather than directly as
function arguments.

Valid Usage (Implicit)

* 
[](#VUID-vkUnmapMemory2-device-parameter) VUID-vkUnmapMemory2-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkUnmapMemory2-pMemoryUnmapInfo-parameter) VUID-vkUnmapMemory2-pMemoryUnmapInfo-parameter

 `pMemoryUnmapInfo` **must** be a valid pointer to a valid [VkMemoryUnmapInfo](#VkMemoryUnmapInfo) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_MEMORY_MAP_FAILED](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkMemoryUnmapInfo` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkMemoryUnmapInfo {
    VkStructureType       sType;
    const void*           pNext;
    VkMemoryUnmapFlags    flags;
    VkDeviceMemory        memory;
} VkMemoryUnmapInfo;

// Provided by VK_KHR_map_memory2
// Equivalent to VkMemoryUnmapInfo
typedef VkMemoryUnmapInfo VkMemoryUnmapInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkMemoryUnmapFlagBits](#VkMemoryUnmapFlagBits) specifying
additional parameters of the memory map operation.

* 
`memory` is the [VkDeviceMemory](#VkDeviceMemory) object to be unmapped.

Valid Usage

* 
[](#VUID-VkMemoryUnmapInfo-memory-07964) VUID-VkMemoryUnmapInfo-memory-07964

`memory` **must** be currently host mapped

* 
[](#VUID-VkMemoryUnmapInfo-flags-09579) VUID-VkMemoryUnmapInfo-flags-09579

If [VK_MEMORY_UNMAP_RESERVE_BIT_EXT](#VkMemoryUnmapFlagBitsKHR) is set in `flags`, the
[`memoryUnmapReserve`](features.html#features-memoryUnmapReserve) **must** be
enabled

* 
[](#VUID-VkMemoryUnmapInfo-flags-09580) VUID-VkMemoryUnmapInfo-flags-09580

If [VK_MEMORY_UNMAP_RESERVE_BIT_EXT](#VkMemoryUnmapFlagBitsKHR) is set in `flags`, the
memory object **must** not have been imported from a handle type of
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_ALLOCATION_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR) or
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_HOST_MAPPED_FOREIGN_MEMORY_BIT_EXT](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkMemoryUnmapInfo-sType-sType) VUID-VkMemoryUnmapInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MEMORY_UNMAP_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkMemoryUnmapInfo-pNext-pNext) VUID-VkMemoryUnmapInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkMemoryUnmapInfo-flags-parameter) VUID-VkMemoryUnmapInfo-flags-parameter

 `flags` **must** be a valid combination of [VkMemoryUnmapFlagBits](#VkMemoryUnmapFlagBits) values

* 
[](#VUID-VkMemoryUnmapInfo-memory-parameter) VUID-VkMemoryUnmapInfo-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

Bits which **can** be set in [VkMemoryUnmapInfo](#VkMemoryUnmapInfo)::`flags`, specifying
additional properties of a memory unmap, are:

// Provided by VK_VERSION_1_4
typedef enum VkMemoryUnmapFlagBits {
  // Provided by VK_EXT_map_memory_placed
    VK_MEMORY_UNMAP_RESERVE_BIT_EXT = 0x00000001,
} VkMemoryUnmapFlagBits;

// Provided by VK_KHR_map_memory2
// Equivalent to VkMemoryUnmapFlagBits
typedef VkMemoryUnmapFlagBits VkMemoryUnmapFlagBitsKHR;

* 
[VK_MEMORY_UNMAP_RESERVE_BIT_EXT](#VkMemoryUnmapFlagBitsKHR) requests that virtual address
range currently occupied by the memory map remain reserved after the
[vkUnmapMemory2](#vkUnmapMemory2) call completes.
Future system memory map operations or calls to [vkMapMemory](#vkMapMemory) or
[vkMapMemory2](#vkMapMemory2) will not return addresses in that range unless the
range has since been unreserved by the client or the mapping is
explicitly placed in that range by calling [vkMapMemory2](#vkMapMemory2) with
[VK_MEMORY_MAP_PLACED_BIT_EXT](#VkMemoryMapFlagBits), or doing the system memory map
equivalent.
When [VK_MEMORY_UNMAP_RESERVE_BIT_EXT](#VkMemoryUnmapFlagBitsKHR) is set, the memory unmap
operation **may** fail, in which case the memory object will remain host
mapped and [vkUnmapMemory2](#vkUnmapMemory2) will return
[VK_ERROR_MEMORY_MAP_FAILED](fundamentals.html#VkResult).

// Provided by VK_VERSION_1_4
typedef VkFlags VkMemoryUnmapFlags;

// Provided by VK_KHR_map_memory2
// Equivalent to VkMemoryUnmapFlags
typedef VkMemoryUnmapFlags VkMemoryUnmapFlagsKHR;

`VkMemoryUnmapFlags` is a bitmask type for setting a mask of zero or
more [VkMemoryUnmapFlagBits](#VkMemoryUnmapFlagBits).

If the memory object is allocated from a heap with the
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](#VkMemoryPropertyFlagBits) bit set, that object’s backing
memory **may** be provided by the implementation lazily.
The actual committed size of the memory **may** initially be as small as zero
(or as large as the requested size), and monotonically increases as
additional memory is needed.

A memory type with this flag set is only allowed to be bound to a
`VkImage` whose usage flags include
[VK_IMAGE_USAGE_TRANSIENT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits).

|  | Using lazily allocated memory objects for framebuffer attachments that are
| --- | --- |
not needed once a render pass instance has completed **may** allow some
implementations to never allocate memory for such attachments. |

To determine the amount of lazily-allocated memory that is currently
committed for a memory object, call:

// Provided by VK_VERSION_1_0
void vkGetDeviceMemoryCommitment(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    VkDeviceSize*                               pCommittedMemoryInBytes);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the memory object being queried.

* 
`pCommittedMemoryInBytes` is a pointer to a `VkDeviceSize`
value in which the number of bytes currently committed is returned, on
success.

The implementation **may** update the commitment at any time, and the value
returned by this query **may** be out of date.

The implementation guarantees to allocate any committed memory from the
`heapIndex` indicated by the memory type that the memory object was
created with.

Valid Usage

* 
[](#VUID-vkGetDeviceMemoryCommitment-memory-00690) VUID-vkGetDeviceMemoryCommitment-memory-00690

`memory` **must** have been created with a memory type that reports
[VK_MEMORY_PROPERTY_LAZILY_ALLOCATED_BIT](#VkMemoryPropertyFlagBits)

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceMemoryCommitment-device-parameter) VUID-vkGetDeviceMemoryCommitment-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceMemoryCommitment-memory-parameter) VUID-vkGetDeviceMemoryCommitment-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle

* 
[](#VUID-vkGetDeviceMemoryCommitment-pCommittedMemoryInBytes-parameter) VUID-vkGetDeviceMemoryCommitment-pCommittedMemoryInBytes-parameter

 `pCommittedMemoryInBytes` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDeviceMemoryCommitment-memory-parent) VUID-vkGetDeviceMemoryCommitment-memory-parent

 `memory` **must** have been created, allocated, or retrieved from `device`

*Protected memory* divides device memory into protected device memory and
unprotected device memory.

Protected memory adds the following concepts:

* 
Memory:

Unprotected device memory, which **can** be visible to the device and **can**
be visible to the host

* 
Protected device memory, which **can** be visible to the device but **must**
not be visible to the host

Resources:

* 
Unprotected images
, unprotected tensors,
     and unprotected buffers, to which unprotected memory **can** be bound

* 
Protected images
, protected tensors,
     and protected buffers, to which protected memory **can** be bound

Command buffers:

* 
Unprotected command buffers, which **can** be submitted to a device queue
to execute unprotected queue operations

* 
Protected command buffers, which **can** be submitted to a
protected-capable device queue to execute protected queue operations

Device queues:

* 
Unprotected device queues, to which unprotected command buffers **can** be
submitted

* 
Protected-capable device queues, to which unprotected command buffers
or protected command buffers **can** be submitted

Queue submissions

* 
Unprotected queue submissions, through which unprotected command
buffers **can** be submitted

* 
Protected queue submissions, through which protected command buffers
**can** be submitted

Queue operations

* 
Unprotected queue operations

* 
Protected queue operations

|  | When the [`protectedMemory`](features.html#features-protectedMemory) feature is
| --- | --- |
enabled, all pipelines **may** be recorded in either protected or unprotected
command buffers (or both), which may incur an extra cost on some
implementations.
This **can** be mitigated by enabling the [`pipelineProtectedAccess`](features.html#features-pipelineProtectedAccess) feature, in which case pipelines created
with [VK_PIPELINE_CREATE_PROTECTED_ACCESS_ONLY_BIT](pipelines.html#VkPipelineCreateFlagBits) may only be recorded
in protected command buffers, and pipelines created with
[VK_PIPELINE_CREATE_NO_PROTECTED_ACCESS_BIT](pipelines.html#VkPipelineCreateFlagBits) may only be recorded in
unprotected command buffers. |

If [VkPhysicalDeviceProtectedMemoryProperties](limits.html#VkPhysicalDeviceProtectedMemoryProperties)::`protectedNoFault`
is [VK_FALSE](fundamentals.html#VK_FALSE), applications **must** not perform any of the following
operations:

* 
Write to unprotected memory within protected queue operations.

* 
Access protected memory within protected queue operations other than in
framebuffer-space pipeline stages, the compute shader stage,
in video decode operations,
in video encode operations,
or the transfer stage.

* 
Perform a query within protected queue operations.

If [VkPhysicalDeviceProtectedMemoryProperties](limits.html#VkPhysicalDeviceProtectedMemoryProperties)::`protectedNoFault`
is [VK_TRUE](fundamentals.html#VK_TRUE), these operations are valid, but reads will return
**undefined** values, and writes will either be dropped or store **undefined**
values.

Additionally, indirect operations **must** not be performed within protected
queue operations.

Whether these operations are valid or not, or if any other invalid usage is
performed, the implementation **must** guarantee that:

* 
Protected device memory **must** never be visible to the host.

* 
Values written to unprotected device memory **must** not be a function of
values from protected memory.

Android’s NDK defines `AHardwareBuffer` objects, which represent
device memory that is shareable across processes and that **can** be accessed
by a variety of media APIs and the hardware used to implement them.
These Android hardware buffer objects **may** be imported into
[VkDeviceMemory](#VkDeviceMemory) objects for access via Vulkan, or exported from Vulkan.
An [VkImage](resources.html#VkImage) or [VkBuffer](resources.html#VkBuffer)
or [VkTensorARM](resources.html#VkTensorARM)
**can** be bound to the imported or exported [VkDeviceMemory](#VkDeviceMemory) object if it
is created with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR).

To remove an unnecessary compile time dependency, an incomplete type
definition of `AHardwareBuffer` is provided in the Vulkan headers:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
struct AHardwareBuffer;

The actual `AHardwareBuffer` type is defined in Android NDK headers.

|  | The NDK format, usage, and size/dimensions of an `AHardwareBuffer`
| --- | --- |
object can be obtained with the `AHardwareBuffer_describe` function.
While Android hardware buffers can be imported to or exported from Vulkan
without using that function, valid usage and implementation behavior is
defined in terms of the `AHardwareBuffer_Desc` properties it returns. |

Android hardware buffer objects are reference-counted using Android NDK
functions outside of the scope of this specification.
A [VkDeviceMemory](#VkDeviceMemory) imported from an Android hardware buffer or that **can**
be exported to an Android hardware buffer **must** acquire a reference to its
`AHardwareBuffer` object, and **must** release this reference when the
device memory is freed.
During the host execution of a Vulkan command that has an Android hardware
buffer as a parameter (including indirect parameters via `pNext`
chains), the application **must** not decrement the Android hardware buffer’s
reference count to zero.

Android hardware buffers **can** be mapped and unmapped for CPU access using
the NDK functions.
These lock and unlock APIs are considered to acquire and release ownership
of the Android hardware buffer, and applications **must** follow the rules
described in [External Resource Sharing](resources.html#resources-external-sharing) to
transfer ownership between the Vulkan instance and these native APIs.

Android hardware buffers **can** be shared with external APIs and Vulkan
instances on the same device, and also with foreign devices.
When transferring ownership of the Android hardware buffer, the external and
foreign special queue families described in
[Queue Family Ownership Transfer](synchronization.html#synchronization-queue-transfers) are not identical.
All APIs which produce or consume Android hardware buffers are considered to
use foreign devices, except OpenGL ES contexts and Vulkan logical devices
that have matching device and driver UUIDs.
Implementations **may** treat a transfer to or from the foreign queue family as
if it were a transfer to or from the external queue family when the Android
hardware buffer’s usage only permits it to be used on the same physical
device.

Vulkan buffer and image usage flags do not correspond exactly to Android
hardware buffer usage flags.
When allocating Android hardware buffers with non-Vulkan APIs, if any
`AHARDWAREBUFFER_USAGE_GPU_*` usage bits are included, by default the
allocator **must** allocate the memory in such a way that it supports Vulkan
usages and creation flags in the
[usage equivalence table](#memory-external-android-hardware-buffer-usage)
which do not have Android hardware buffer equivalents.

An [VkAndroidHardwareBufferUsageANDROID](capabilities.html#VkAndroidHardwareBufferUsageANDROID) structure **can** be included in
the `pNext` chain of a [VkImageFormatProperties2](capabilities.html#VkImageFormatProperties2) structure passed
to [vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) to obtain optimal Android
hardware buffer usage flags for specific Vulkan resource creation
parameters.
Some usage flags returned by these commands are **required** based on the input
parameters, but additional vendor-specific usage flags
(`AHARDWAREBUFFER_USAGE_VENDOR_*`) **may** also be returned.
Any Android hardware buffer allocated with these vendor-specific usage flags
and imported to Vulkan **must** only be bound to resources created with
parameters that are a subset of the parameters used to obtain the Android
hardware buffer usage, since the memory **may** have been allocated in a way
incompatible with other parameters.
If an Android hardware buffer is successfully allocated with additional
non-vendor-specific usage flags in addition to the recommended usage, it
**must** support being used in the same ways as an Android hardware buffer
allocated with only the recommended usage, and also in ways indicated by the
additional usage.

Android hardware buffers **may** represent images using implementation-specific
formats, layouts, color models, etc., which do not have Vulkan equivalents.
Such *external formats* are commonly used by external image sources such as
video decoders or cameras.
Vulkan **can** import Android hardware buffers that have external formats, but
since the image contents are in a possibly proprietary representation,
images with external formats **must** have optimal tiling, and their use is
restricted.
Images with external formats **must** only be sampled with a sampler that has
Y′CBCR conversion enabled.

Images that will be backed by an Android hardware buffer **can** use an
external format by setting [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`format` to
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) and including a [VkExternalFormatANDROID](resources.html#VkExternalFormatANDROID)
structure in the `pNext` chain.
Images **can** be created with an external format even if the Android hardware
buffer has a format which has an
[equivalent Vulkan format](#memory-external-android-hardware-buffer-formats)
to enable consistent handling of images from sources that might use either
category of format.
However, all images created with an external format are subject to the valid
usage requirements associated with external formats, even if the Android
hardware buffer’s format has a Vulkan equivalent.
The external format of an Android hardware buffer **can** be obtained by
passing a [VkAndroidHardwareBufferFormatPropertiesANDROID](#VkAndroidHardwareBufferFormatPropertiesANDROID) structure to
[vkGetAndroidHardwareBufferPropertiesANDROID](#vkGetAndroidHardwareBufferPropertiesANDROID).

Android hardware buffers have intrinsic width, height, format, and usage
properties, so Vulkan images bound to memory imported from an Android
hardware buffer **must** use dedicated allocations:
`VkMemoryDedicatedRequirements`::`requiresDedicatedAllocation` **must**
be [VK_TRUE](fundamentals.html#VK_TRUE) for images created with
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes` that includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR).
When creating an image that will be bound to an imported Android hardware
buffer, the image creation parameters **must** be equivalent to the
`AHardwareBuffer` properties as described by the valid usage of
[VkMemoryAllocateInfo](#VkMemoryAllocateInfo).
Similarly, device memory allocated for a dedicated image **must** not be
exported to an Android hardware buffer until it has been bound to that
image, and the implementation **must** return an Android hardware buffer with
properties derived from the image:

* 
The `width` and `height` members of `AHardwareBuffer_Desc`
**must** be the same as the `width` and `height` members of
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`extent`, respectively.

* 
The `layers` member of `AHardwareBuffer_Desc` **must** be the same as
the `arrayLayers` member of [VkImageCreateInfo](resources.html#VkImageCreateInfo).

* 
The `format` member of `AHardwareBuffer_Desc` **must** be equivalent
to [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`format` as defined by
[AHardwareBuffer Format    Equivalence](#memory-external-android-hardware-buffer-formats).

* 
The `usage` member of `AHardwareBuffer_Desc` **must** include bits
corresponding to bits included in [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`usage`
and [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags` where such a correspondence
exists according to
[AHardwareBuffer Usage    Equivalence](#memory-external-android-hardware-buffer-usage).
It **may** also include additional usage bits, including vendor-specific
usages.
Presence of vendor usage bits **may** make the Android hardware buffer only
usable in ways indicated by the image creation parameters, even when
used outside Vulkan, in a similar way that allocating the Android
hardware buffer with usage returned in
[VkAndroidHardwareBufferUsageANDROID](capabilities.html#VkAndroidHardwareBufferUsageANDROID) does.

Implementations **may** support fewer combinations of image creation parameters
for images with Android hardware buffer external handle type than for
non-external images.
Support for a given set of parameters **can** be determined by passing
[VkExternalImageFormatProperties](capabilities.html#VkExternalImageFormatProperties) to
[vkGetPhysicalDeviceImageFormatProperties2](capabilities.html#vkGetPhysicalDeviceImageFormatProperties2) with `handleType` set to
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_ANDROID_HARDWARE_BUFFER_BIT_ANDROID](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR).
Any Android hardware buffer successfully allocated outside Vulkan with usage
that includes `AHARDWAREBUFFER_USAGE_GPU_*` **must** be supported when using
equivalent Vulkan image parameters.
If a given choice of image parameters are supported for import, they **can**
also be used to create an image and memory that will be exported to an
Android hardware buffer.

| AHardwareBuffer Format | Vulkan Format |
| --- | --- |
| `AHARDWAREBUFFER_FORMAT_R8G8B8A8_UNORM` | [VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_R8G8B8X8_UNORM` 1 | [VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_R8G8B8_UNORM` | [VK_FORMAT_R8G8B8_UNORM](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_R5G6B5_UNORM` | [VK_FORMAT_R5G6B5_UNORM_PACK16](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_R16G16B16A16_FLOAT` | [VK_FORMAT_R16G16B16A16_SFLOAT](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_R10G10B10A2_UNORM` | [VK_FORMAT_A2B10G10R10_UNORM_PACK32](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_D16_UNORM` | [VK_FORMAT_D16_UNORM](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_D24_UNORM` | [VK_FORMAT_X8_D24_UNORM_PACK32](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_D24_UNORM_S8_UINT` | [VK_FORMAT_D24_UNORM_S8_UINT](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_D32_FLOAT` | [VK_FORMAT_D32_SFLOAT](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_D32_FLOAT_S8_UINT` | [VK_FORMAT_D32_SFLOAT_S8_UINT](formats.html#VkFormat) |
| `AHARDWAREBUFFER_FORMAT_S8_UINT` | [VK_FORMAT_S8_UINT](formats.html#VkFormat) |

| AHardwareBuffer Usage | Vulkan Usage or Creation Flag |
| --- | --- |
| None | [VK_IMAGE_USAGE_TRANSFER_SRC_BIT](resources.html#VkImageUsageFlagBits) |
| None | [VK_IMAGE_USAGE_TRANSFER_DST_BIT](resources.html#VkImageUsageFlagBits) |
| `AHARDWAREBUFFER_USAGE_GPU_SAMPLED_IMAGE` | [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) |
| `AHARDWAREBUFFER_USAGE_GPU_SAMPLED_IMAGE` | [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) |
| `AHARDWAREBUFFER_USAGE_GPU_FRAMEBUFFER` 3 | [VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) |
| `AHARDWAREBUFFER_USAGE_GPU_FRAMEBUFFER` 3 | [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) |
| `AHARDWAREBUFFER_USAGE_GPU_CUBE_MAP` | [VK_IMAGE_CREATE_CUBE_COMPATIBLE_BIT](resources.html#VkImageCreateFlagBits) |
| `AHARDWAREBUFFER_USAGE_GPU_MIPMAP_COMPLETE` | None 2 |
| `AHARDWAREBUFFER_USAGE_PROTECTED_CONTENT` | [VK_IMAGE_CREATE_PROTECTED_BIT](resources.html#VkImageCreateFlagBits) |
| None | [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](resources.html#VkImageCreateFlagBits) |
| None | [VK_IMAGE_CREATE_EXTENDED_USAGE_BIT](resources.html#VkImageCreateFlagBits) |
| `AHARDWAREBUFFER_USAGE_GPU_DATA_BUFFER` 4 | [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) |

1

Vulkan does not differentiate between
`AHARDWAREBUFFER_FORMAT_R8G8B8A8_UNORM` and
`AHARDWAREBUFFER_FORMAT_R8G8B8X8_UNORM`: they both behave as
[VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat).
After an external entity writes to a
`AHARDWAREBUFFER_FORMAT_R8G8B8X8_UNORM` Android hardware buffer, the
values read by Vulkan from the X/A component are **undefined**.
To emulate the traditional behavior of the X component during sampling
or blending, applications **should** use [VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle) in
image view component mappings and [VK_BLEND_FACTOR_ONE](framebuffer.html#VkBlendFactor) in color
blend factors.
There is no way to avoid copying these **undefined** values when copying
from such an image to another image or buffer.

2

The `AHARDWAREBUFFER_USAGE_GPU_MIPMAP_COMPLETE` flag does not
correspond to a Vulkan image usage or creation flag.
Instead, its presence indicates that the Android hardware buffer
contains a complete mipmap chain, and its absence indicates that the
Android hardware buffer contains only a single mip level.

3

Only image usages valid for the format are valid.
It would be invalid to take a Android Hardware Buffer with a format of
`AHARDWAREBUFFER_FORMAT_R8G8B8A8_UNORM` that has a
`AHARDWAREBUFFER_USAGE_GPU_FRAMEBUFFER` usage and try to create an
image with [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits).

4

In combination with a hardware buffer format other than `BLOB`.

|  | When using [VK_IMAGE_CREATE_MUTABLE_FORMAT_BIT](resources.html#VkImageCreateFlagBits) with Android hardware
| --- | --- |
buffer images, applications **should** use [VkImageFormatListCreateInfo](resources.html#VkImageFormatListCreateInfo) to
inform the implementation which view formats will be used with the image.
For some common sets of format, this allows some implementations to provide
significantly better performance when accessing the image via Vulkan. |

Android hardware buffers with a format of `AHARDWAREBUFFER_FORMAT_BLOB`
and usage that includes `AHARDWAREBUFFER_USAGE_GPU_DATA_BUFFER` **can** be
used as the backing store for [VkBuffer](resources.html#VkBuffer) objects.
Such Android hardware buffers have a size in bytes specified by their
`width`; `height` and `layers` are both `1`.

Unlike images, buffer resources backed by Android hardware buffers do not
require dedicated allocations.

Exported `AHardwareBuffer` objects that do not have dedicated images
**must** have a format of `AHARDWAREBUFFER_FORMAT_BLOB`, usage **must** include
`AHARDWAREBUFFER_USAGE_GPU_DATA_BUFFER`, `width` **must** equal the
device memory allocation size, and `height` and `layers` **must** be `1`.

The QNX SDP defines `_screen_buffer` objects, which represent a buffer
that the QNX Screen graphics subsystem can use directly in its windowing
system APIs.
More specifically, a Screen buffer is an area of memory that stores pixel
data.
It can be attached to Screen windows, streams, or pixmaps.
These QNX Screen buffer objects **may** be imported into [VkDeviceMemory](#VkDeviceMemory)
objects for access via Vulkan.
An [VkImage](resources.html#VkImage) or [VkBuffer](resources.html#VkBuffer) **can** be bound to the imported
[VkDeviceMemory](#VkDeviceMemory) object if it is created with
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR).

`struct` `_screen_buffer` is strongly typed, so naming the handle type
is redundant.
The internal layout and therefore size of a `struct` `_screen_buffer`
image may depend on native usage flags that do not have corresponding Vulkan
counterparts.

The design of Screen in the QNX SDP makes it difficult to determine the
validity of objects from outside of Screen.
Therefore, applications **must** ensure that QNX Screen buffer objects provided
used in various Vulkan interfaces are ones created explicitly with QNX
Screen APIs.
See QNX SDP documentation for more information.

A [VkDeviceMemory](#VkDeviceMemory) imported from a QNX Screen buffer has no way to
acquire a reference to its `_screen_buffer` object.
Therefore, during the host execution of a Vulkan command that has a QNX
Screen buffer as a parameter (including indirect parameters via `pNext`
chains), the application **must** ensure that the QNX Screen buffer resource
remains valid.

Generally, for a `_screen_buffer` object to be valid for use within a
Vulkan implementation, the buffer object **should** have a
`_screen_buffer`::`SCREEN_PROPERTY_USAGE` that includes at least one
of: `SCREEN_USAGE_VULKAN`, `SCREEN_USAGE_OPENGL_ES2`,
`SCREEN_USAGE_OPENGL_ES3`, or `SCREEN_USAGE_NATIVE`.
The exact Screen-native usage flags required depends on the Vulkan
implementation, and QNX Screen itself will not necessarily enforce these
requirements.
Note that Screen-native usage flags are in no way related to usage flags in
the Vulkan specification.

QNX Screen buffers **may** represent images using implementation-specific
formats, layouts, color models, etc., which do not have Vulkan equivalents.
Such *external formats* are commonly used by external image sources such as
video decoders or cameras.
Vulkan **can** import QNX Screen buffers that have external formats, but since
the image contents are in an undiscoverable and possibly proprietary
representation, images with external formats **must** only be used as sampled
images, **must** only be sampled with a sampler that has Y′CBCR conversion
enabled, and **must** have optimal tiling.

Images that will be backed by a QNX Screen buffer **can** use an external
format by setting [VkImageCreateInfo](resources.html#VkImageCreateInfo)::`format` to
[VK_FORMAT_UNDEFINED](formats.html#VkFormat) and including a [VkExternalFormatQNX](resources.html#VkExternalFormatQNX)
structure in the `pNext` chain.
Images **can** be created with an external format even if the QNX Screen buffer
has a format which has an
[equivalent Vulkan format](#memory-external-qnx-screen-buffer-formats) to
enable consistent handling of images from sources that might use either
category of format.
The external format of a QNX Screen buffer **can** be obtained by passing a
[VkScreenBufferFormatPropertiesQNX](#VkScreenBufferFormatPropertiesQNX) structure to
[vkGetScreenBufferPropertiesQNX](#vkGetScreenBufferPropertiesQNX).

QNX Screen buffers have intrinsic width, height, format, and usage
properties, so Vulkan images bound to memory imported from a QNX Screen
buffer **must** use dedicated allocations:
`VkMemoryDedicatedRequirements`::`requiresDedicatedAllocation` **must**
be [VK_TRUE](fundamentals.html#VK_TRUE) for images created with
[VkExternalMemoryImageCreateInfo](resources.html#VkExternalMemoryImageCreateInfo)::`handleTypes` that includes
[VK_EXTERNAL_MEMORY_HANDLE_TYPE_SCREEN_BUFFER_BIT_QNX](capabilities.html#VkExternalMemoryHandleTypeFlagBitsKHR).
When creating an image that will be bound to an imported QNX Screen buffer,
the image creation parameters **must** be equivalent to the `_screen_buffer`
properties as described by the valid usage of [VkMemoryAllocateInfo](#VkMemoryAllocateInfo).

| QNX Screen Format | Vulkan Format |
| --- | --- |
| `SCREEN_FORMAT_RGBA8888` | [VK_FORMAT_B8G8R8A8_UNORM](formats.html#VkFormat) |
| `SCREEN_FORMAT_RGBX8888` 1 | [VK_FORMAT_B8G8R8A8_UNORM](formats.html#VkFormat) |
| `SCREEN_FORMAT_BGRA8888` | [VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat) |
| `SCREEN_FORMAT_BGRX8888` 1 | [VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat) |
| `SCREEN_FORMAT_RGBA1010102` | [VK_FORMAT_A2R10G10B10_UNORM_PACK32](formats.html#VkFormat) |
| `SCREEN_FORMAT_RGBX1010102` 1 | [VK_FORMAT_A2R10G10B10_UNORM_PACK32](formats.html#VkFormat) |
| `SCREEN_FORMAT_BGRA1010102` | [VK_FORMAT_A2B10G10R10_UNORM_PACK32](formats.html#VkFormat) |
| `SCREEN_FORMAT_BGRX1010102` 1 | [VK_FORMAT_A2B10G10R10_UNORM_PACK32](formats.html#VkFormat) |
| `SCREEN_FORMAT_RGBA5551` | [VK_FORMAT_A1R5G5B5_UNORM_PACK16](formats.html#VkFormat) |
| `SCREEN_FORMAT_RGBX5551` 1 | [VK_FORMAT_A1R5G5B5_UNORM_PACK16](formats.html#VkFormat) |
| `SCREEN_FORMAT_RGB565` | [VK_FORMAT_R5G6B5_UNORM_PACK16](formats.html#VkFormat) |
| `SCREEN_FORMAT_RGB888` | [VK_FORMAT_R8G8B8_UNORM](formats.html#VkFormat) |

1

Vulkan does not differentiate between `SCREEN_FORMAT_RGBA8888` and
`SCREEN_FORMAT_RGBX8888`: they both behave as
[VK_FORMAT_R8G8B8A8_UNORM](formats.html#VkFormat).
After an external entity writes to a `SCREEN_FORMAT_RGBX8888` QNX
Screen buffer, the values read by Vulkan from the X/A component are
**undefined**.
To emulate the traditional behavior of the X component during sampling
or blending, applications **should** use [VK_COMPONENT_SWIZZLE_ONE](resources.html#VkComponentSwizzle) in
image view component mappings and [VK_BLEND_FACTOR_ONE](framebuffer.html#VkBlendFactor) in color
blend factors.
There is no way to avoid copying these **undefined** values when copying
from such an image to another image or buffer.
The same behavior applies to the following pairs:
`SCREEN_FORMAT_BGRA8888` and `SCREEN_FORMAT_BGRX8888`,
`SCREEN_FORMAT_RGBA1010102` and `SCREEN_FORMAT_RGBX1010102`,
`SCREEN_FORMAT_BGRA1010102` and `SCREEN_FORMAT_BGRX1010102`,
`SCREEN_FORMAT_RGBA5551` and `SCREEN_FORMAT_RGBX5551`

*Peer memory* is memory that is allocated for a given physical device and
then bound to a resource and accessed by a different physical device, in a
logical device that represents multiple physical devices.
Some ways of reading and writing peer memory **may** not be supported by a
device.

To determine how peer memory **can** be accessed, call:

// Provided by VK_VERSION_1_1
void vkGetDeviceGroupPeerMemoryFeatures(
    VkDevice                                    device,
    uint32_t                                    heapIndex,
    uint32_t                                    localDeviceIndex,
    uint32_t                                    remoteDeviceIndex,
    VkPeerMemoryFeatureFlags*                   pPeerMemoryFeatures);

// Provided by VK_KHR_device_group
// Equivalent to vkGetDeviceGroupPeerMemoryFeatures
void vkGetDeviceGroupPeerMemoryFeaturesKHR(
    VkDevice                                    device,
    uint32_t                                    heapIndex,
    uint32_t                                    localDeviceIndex,
    uint32_t                                    remoteDeviceIndex,
    VkPeerMemoryFeatureFlags*                   pPeerMemoryFeatures);

* 
`device` is the logical device that owns the memory.

* 
`heapIndex` is the index of the memory heap from which the memory is
allocated.

* 
`localDeviceIndex` is the device index of the physical device that
performs the memory access.

* 
`remoteDeviceIndex` is the device index of the physical device that
the memory is allocated for.

* 
`pPeerMemoryFeatures` is a pointer to a
[VkPeerMemoryFeatureFlags](#VkPeerMemoryFeatureFlags) bitmask indicating which types of memory
accesses are supported for the combination of heap, local, and remote
devices.

Valid Usage

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-heapIndex-00691) VUID-vkGetDeviceGroupPeerMemoryFeatures-heapIndex-00691

`heapIndex` **must** be less than `memoryHeapCount`

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00692) VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00692

`localDeviceIndex` **must** be a valid device index

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-remoteDeviceIndex-00693) VUID-vkGetDeviceGroupPeerMemoryFeatures-remoteDeviceIndex-00693

`remoteDeviceIndex` **must** be a valid device index

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00694) VUID-vkGetDeviceGroupPeerMemoryFeatures-localDeviceIndex-00694

`localDeviceIndex` **must** not equal `remoteDeviceIndex`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-device-parameter) VUID-vkGetDeviceGroupPeerMemoryFeatures-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceGroupPeerMemoryFeatures-pPeerMemoryFeatures-parameter) VUID-vkGetDeviceGroupPeerMemoryFeatures-pPeerMemoryFeatures-parameter

 `pPeerMemoryFeatures` **must** be a valid pointer to a [VkPeerMemoryFeatureFlags](#VkPeerMemoryFeatureFlags) value

Bits which **may** be set in
[vkGetDeviceGroupPeerMemoryFeatures](#vkGetDeviceGroupPeerMemoryFeatures)::`pPeerMemoryFeatures`,
indicating supported peer memory features, are:

// Provided by VK_VERSION_1_1
typedef enum VkPeerMemoryFeatureFlagBits {
    VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT = 0x00000001,
    VK_PEER_MEMORY_FEATURE_COPY_DST_BIT = 0x00000002,
    VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT = 0x00000004,
    VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT = 0x00000008,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT_KHR = VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_COPY_DST_BIT_KHR = VK_PEER_MEMORY_FEATURE_COPY_DST_BIT,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT_KHR = VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT,
  // Provided by VK_KHR_device_group
    VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT_KHR = VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT,
} VkPeerMemoryFeatureFlagBits;

// Provided by VK_KHR_device_group
// Equivalent to VkPeerMemoryFeatureFlagBits
typedef VkPeerMemoryFeatureFlagBits VkPeerMemoryFeatureFlagBitsKHR;

* 
[VK_PEER_MEMORY_FEATURE_COPY_SRC_BIT](#VkPeerMemoryFeatureFlagBitsKHR) specifies that the memory **can**
be accessed as the source of any `vkCmdCopy*` command.

* 
[VK_PEER_MEMORY_FEATURE_COPY_DST_BIT](#VkPeerMemoryFeatureFlagBitsKHR) specifies that the memory **can**
be accessed as the destination of any `vkCmdCopy*` command.

* 
[VK_PEER_MEMORY_FEATURE_GENERIC_SRC_BIT](#VkPeerMemoryFeatureFlagBitsKHR) specifies that the memory
**can** be read as any memory access type.

* 
[VK_PEER_MEMORY_FEATURE_GENERIC_DST_BIT](#VkPeerMemoryFeatureFlagBitsKHR) specifies that the memory
**can** be written as any memory access type.
Shader atomics are considered to be writes.

|  | The peer memory features of a memory heap also apply to any accesses that
| --- | --- |
**may** be performed during [image layout transitions](synchronization.html#synchronization-image-layout-transitions). |

[VK_PEER_MEMORY_FEATURE_COPY_DST_BIT](#VkPeerMemoryFeatureFlagBitsKHR) **must** be supported for all host
local heaps and for at least one device-local memory heap.

If a device does not support a peer memory feature, it is still valid to use
a resource that includes both local and peer memory bindings with the
corresponding access type as long as only the local bindings are actually
accessed.
For example, an application doing split-frame rendering would use
framebuffer attachments that include both local and peer memory bindings,
but would scissor the rendering to only update local memory.

// Provided by VK_VERSION_1_1
typedef VkFlags VkPeerMemoryFeatureFlags;

// Provided by VK_KHR_device_group
// Equivalent to VkPeerMemoryFeatureFlags
typedef VkPeerMemoryFeatureFlags VkPeerMemoryFeatureFlagsKHR;

`VkPeerMemoryFeatureFlags` is a bitmask type for setting a mask of zero
or more [VkPeerMemoryFeatureFlagBits](#VkPeerMemoryFeatureFlagBits).

To query a 64-bit opaque capture address value from a memory object, call:

// Provided by VK_VERSION_1_2
uint64_t vkGetDeviceMemoryOpaqueCaptureAddress(
    VkDevice                                    device,
    const VkDeviceMemoryOpaqueCaptureAddressInfo* pInfo);

// Provided by VK_KHR_buffer_device_address
// Equivalent to vkGetDeviceMemoryOpaqueCaptureAddress
uint64_t vkGetDeviceMemoryOpaqueCaptureAddressKHR(
    VkDevice                                    device,
    const VkDeviceMemoryOpaqueCaptureAddressInfo* pInfo);

* 
`device` is the logical device that the memory object was allocated
on.

* 
`pInfo` is a pointer to a
[VkDeviceMemoryOpaqueCaptureAddressInfo](#VkDeviceMemoryOpaqueCaptureAddressInfo) structure specifying the
memory object to retrieve an address for.

The 64-bit return value is an opaque address representing the start of
`pInfo->memory`.

If the memory object was allocated with a non-zero value of
[VkMemoryOpaqueCaptureAddressAllocateInfo](#VkMemoryOpaqueCaptureAddressAllocateInfo)::`opaqueCaptureAddress`,
the return value **must** be the same address.

|  | The expected usage for these opaque addresses is only for trace
| --- | --- |
capture/replay tools to store these addresses in a trace and subsequently
specify them during replay. |

Valid Usage

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-None-03334) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-None-03334

The [`bufferDeviceAddress`](features.html#features-bufferDeviceAddress) and
[    `bufferDeviceAddressCaptureReplay`](features.html#features-bufferDeviceAddressCaptureReplay) features **must** be enabled

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-10727) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-10727

`pInfo->memory` **must** have been allocated using the
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_CAPTURE_REPLAY_BIT](#VkMemoryAllocateFlagBitsKHR) flag

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-03335) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-03335

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-parameter) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-parameter) VUID-vkGetDeviceMemoryOpaqueCaptureAddress-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkDeviceMemoryOpaqueCaptureAddressInfo](#VkDeviceMemoryOpaqueCaptureAddressInfo) structure

The `VkDeviceMemoryOpaqueCaptureAddressInfo` structure is defined as:

// Provided by VK_VERSION_1_2
typedef struct VkDeviceMemoryOpaqueCaptureAddressInfo {
    VkStructureType    sType;
    const void*        pNext;
    VkDeviceMemory     memory;
} VkDeviceMemoryOpaqueCaptureAddressInfo;

// Provided by VK_KHR_buffer_device_address
// Equivalent to VkDeviceMemoryOpaqueCaptureAddressInfo
typedef VkDeviceMemoryOpaqueCaptureAddressInfo VkDeviceMemoryOpaqueCaptureAddressInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`memory` specifies the memory whose address is being queried.

Valid Usage

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-03336) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-03336

`memory` **must** have been allocated with
[VK_MEMORY_ALLOCATE_DEVICE_ADDRESS_BIT](#VkMemoryAllocateFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-sType-sType) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DEVICE_MEMORY_OPAQUE_CAPTURE_ADDRESS_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-pNext-pNext) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-parameter) VUID-VkDeviceMemoryOpaqueCaptureAddressInfo-memory-parameter

 `memory` **must** be a valid [VkDeviceMemory](#VkDeviceMemory) handle
