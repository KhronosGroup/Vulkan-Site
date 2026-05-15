# Private Data

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/private_data.html

## Content

The private data extension provides a way for users to associate arbitrary
application-defined data with Vulkan objects.
This association is accomplished by storing 64-bit unsigned integers of
application-defined data in private data slots.
A private data slot represents a storage allocation for one data item for
each child object of the device.

An application **can** reserve private data slots at device creation.
To reserve private data slots, insert a [VkDevicePrivateDataCreateInfo](devsandqueues.html#VkDevicePrivateDataCreateInfo)
in the `pNext` chain in [VkDeviceCreateInfo](devsandqueues.html#VkDeviceCreateInfo) before device creation.
Multiple [VkDevicePrivateDataCreateInfo](devsandqueues.html#VkDevicePrivateDataCreateInfo) structures **can** be chained
together, and the sum of the requested slots will be reserved.
This is an exception to the specified valid usage for
[structure pointer chains](fundamentals.html#fundamentals-validusage-pNext).
Reserving slots in this manner is not strictly necessary but it **may** improve
performance.

Private data slots are represented by `VkPrivateDataSlot` handles:

// Provided by VK_VERSION_1_3
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPrivateDataSlot)

// Provided by VK_EXT_private_data
// Equivalent to VkPrivateDataSlot
typedef VkPrivateDataSlot VkPrivateDataSlotEXT;

To create a private data slot, call:

// Provided by VK_VERSION_1_3
VkResult vkCreatePrivateDataSlot(
    VkDevice                                    device,
    const VkPrivateDataSlotCreateInfo*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPrivateDataSlot*                          pPrivateDataSlot);

// Provided by VK_EXT_private_data
// Equivalent to vkCreatePrivateDataSlot
VkResult vkCreatePrivateDataSlotEXT(
    VkDevice                                    device,
    const VkPrivateDataSlotCreateInfo*          pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkPrivateDataSlot*                          pPrivateDataSlot);

* 
`device` is the logical device associated with the creation of the
object(s) holding the private data slot.

* 
`pCreateInfo` is a pointer to a [VkPrivateDataSlotCreateInfo](#VkPrivateDataSlotCreateInfo)

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pPrivateDataSlot` is a pointer to a [VkPrivateDataSlot](#VkPrivateDataSlot) handle
in which the resulting private data slot is returned

Valid Usage

* 
[](#VUID-vkCreatePrivateDataSlot-privateData-04564) VUID-vkCreatePrivateDataSlot-privateData-04564

The [`privateData`](features.html#features-privateData) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCreatePrivateDataSlot-device-parameter) VUID-vkCreatePrivateDataSlot-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreatePrivateDataSlot-pCreateInfo-parameter) VUID-vkCreatePrivateDataSlot-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkPrivateDataSlotCreateInfo](#VkPrivateDataSlotCreateInfo) structure

* 
[](#VUID-vkCreatePrivateDataSlot-pAllocator-parameter) VUID-vkCreatePrivateDataSlot-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreatePrivateDataSlot-pPrivateDataSlot-parameter) VUID-vkCreatePrivateDataSlot-pPrivateDataSlot-parameter

 `pPrivateDataSlot` **must** be a valid pointer to a [VkPrivateDataSlot](#VkPrivateDataSlot) handle

* 
[](#VUID-vkCreatePrivateDataSlot-device-queuecount) VUID-vkCreatePrivateDataSlot-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPrivateDataSlotCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkPrivateDataSlotCreateInfo {
    VkStructureType                 sType;
    const void*                     pNext;
    VkPrivateDataSlotCreateFlags    flags;
} VkPrivateDataSlotCreateInfo;

// Provided by VK_EXT_private_data
// Equivalent to VkPrivateDataSlotCreateInfo
typedef VkPrivateDataSlotCreateInfo VkPrivateDataSlotCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

Valid Usage (Implicit)

* 
[](#VUID-VkPrivateDataSlotCreateInfo-sType-sType) VUID-VkPrivateDataSlotCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PRIVATE_DATA_SLOT_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPrivateDataSlotCreateInfo-pNext-pNext) VUID-VkPrivateDataSlotCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPrivateDataSlotCreateInfo-flags-zerobitmask) VUID-VkPrivateDataSlotCreateInfo-flags-zerobitmask

 `flags` **must** be `0`

// Provided by VK_VERSION_1_3
typedef VkFlags VkPrivateDataSlotCreateFlags;

// Provided by VK_EXT_private_data
// Equivalent to VkPrivateDataSlotCreateFlags
typedef VkPrivateDataSlotCreateFlags VkPrivateDataSlotCreateFlagsEXT;

`VkPrivateDataSlotCreateFlags` is a bitmask type for setting a mask, but
is currently reserved for future use.

To destroy a private data slot, call:

// Provided by VK_VERSION_1_3
void vkDestroyPrivateDataSlot(
    VkDevice                                    device,
    VkPrivateDataSlot                           privateDataSlot,
    const VkAllocationCallbacks*                pAllocator);

// Provided by VK_EXT_private_data
// Equivalent to vkDestroyPrivateDataSlot
void vkDestroyPrivateDataSlotEXT(
    VkDevice                                    device,
    VkPrivateDataSlot                           privateDataSlot,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device associated with the creation of the
object(s) holding the private data slot.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`privateDataSlot` is the private data slot to destroy.

Valid Usage

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-04062) VUID-vkDestroyPrivateDataSlot-privateDataSlot-04062

If `VkAllocationCallbacks` were provided when `privateDataSlot`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-04063) VUID-vkDestroyPrivateDataSlot-privateDataSlot-04063

If no `VkAllocationCallbacks` were provided when
`privateDataSlot` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyPrivateDataSlot-device-parameter) VUID-vkDestroyPrivateDataSlot-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-parameter) VUID-vkDestroyPrivateDataSlot-privateDataSlot-parameter

 If `privateDataSlot` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `privateDataSlot` **must** be a valid [VkPrivateDataSlot](#VkPrivateDataSlot) handle

* 
[](#VUID-vkDestroyPrivateDataSlot-pAllocator-parameter) VUID-vkDestroyPrivateDataSlot-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyPrivateDataSlot-privateDataSlot-parent) VUID-vkDestroyPrivateDataSlot-privateDataSlot-parent

 If `privateDataSlot` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `privateDataSlot` **must** be externally synchronized

To store application-defined data in a slot associated with a Vulkan object,
call:

// Provided by VK_VERSION_1_3
VkResult vkSetPrivateData(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t                                    data);

// Provided by VK_EXT_private_data
// Equivalent to vkSetPrivateData
VkResult vkSetPrivateDataEXT(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t                                    data);

* 
`device` is the device that created the object.

* 
`objectType` is a [VkObjectType](debugging.html#VkObjectType) specifying the type of object
to associate data with.

* 
`objectHandle` is a handle to the object to associate data with.

* 
`privateDataSlot` is a handle to a [VkPrivateDataSlot](#VkPrivateDataSlot)
specifying location of private data storage.

* 
`data` is application-defined data to associate the object with.
This data will be stored at `privateDataSlot`.

Valid Usage

* 
[](#VUID-vkSetPrivateData-objectHandle-04016) VUID-vkSetPrivateData-objectHandle-04016

`objectHandle` **must** be `device` or a child of `device`

* 
[](#VUID-vkSetPrivateData-objectHandle-04017) VUID-vkSetPrivateData-objectHandle-04017

`objectHandle` **must** be a valid handle to an object of type
`objectType`

Valid Usage (Implicit)

* 
[](#VUID-vkSetPrivateData-device-parameter) VUID-vkSetPrivateData-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkSetPrivateData-objectType-parameter) VUID-vkSetPrivateData-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](debugging.html#VkObjectType) value

* 
[](#VUID-vkSetPrivateData-privateDataSlot-parameter) VUID-vkSetPrivateData-privateDataSlot-parameter

 `privateDataSlot` **must** be a valid [VkPrivateDataSlot](#VkPrivateDataSlot) handle

* 
[](#VUID-vkSetPrivateData-privateDataSlot-parent) VUID-vkSetPrivateData-privateDataSlot-parent

 `privateDataSlot` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To retrieve application-defined data from a slot associated with a Vulkan
object, call:

// Provided by VK_VERSION_1_3
void vkGetPrivateData(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t*                                   pData);

// Provided by VK_EXT_private_data
// Equivalent to vkGetPrivateData
void vkGetPrivateDataEXT(
    VkDevice                                    device,
    VkObjectType                                objectType,
    uint64_t                                    objectHandle,
    VkPrivateDataSlot                           privateDataSlot,
    uint64_t*                                   pData);

* 
`device` is the device that created the object

* 
`objectType` is a [VkObjectType](debugging.html#VkObjectType) specifying the type of object
data is associated with.

* 
`objectHandle` is a handle to the object data is associated with.

* 
`privateDataSlot` is a handle to a [VkPrivateDataSlot](#VkPrivateDataSlot)
specifying location of private data pointer storage.

* 
`pData` is a pointer to specify where application-defined data is
returned.
`0` will be written in the absence of a previous call to
`vkSetPrivateData` using the object specified by `objectHandle`.

|  | Due to platform details on Android, implementations might not be able to
| --- | --- |
reliably return `0` from calls to `vkGetPrivateData` for
[VkSwapchainKHR](VK_KHR_surface/wsi.html#VkSwapchainKHR) objects on which `vkSetPrivateData` has not
previously been called.
This erratum is exclusive to the Android platform and objects of type
[VkSwapchainKHR](VK_KHR_surface/wsi.html#VkSwapchainKHR). |

Valid Usage

* 
[](#VUID-vkGetPrivateData-objectType-04018) VUID-vkGetPrivateData-objectType-04018

`objectHandle` **must** be `device` or a child of `device`

* 
[](#VUID-vkGetPrivateData-objectHandle-09498) VUID-vkGetPrivateData-objectHandle-09498

`objectHandle` **must** be a valid handle to an object of type
`objectType`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPrivateData-device-parameter) VUID-vkGetPrivateData-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPrivateData-objectType-parameter) VUID-vkGetPrivateData-objectType-parameter

 `objectType` **must** be a valid [VkObjectType](debugging.html#VkObjectType) value

* 
[](#VUID-vkGetPrivateData-privateDataSlot-parameter) VUID-vkGetPrivateData-privateDataSlot-parameter

 `privateDataSlot` **must** be a valid [VkPrivateDataSlot](#VkPrivateDataSlot) handle

* 
[](#VUID-vkGetPrivateData-pData-parameter) VUID-vkGetPrivateData-pData-parameter

 `pData` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetPrivateData-privateDataSlot-parent) VUID-vkGetPrivateData-privateDataSlot-parent

 `privateDataSlot` **must** have been created, allocated, or retrieved from `device`
