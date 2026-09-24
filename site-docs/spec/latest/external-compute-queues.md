# External Compute Queues

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/VK_NV_external_compute_queue/VK_NV_external_compute_queue.html

## Content

External compute queues are used to join compatible external APIs to a
`VkDevice`, allowing workloads submitted through these external APIs to
be executed simultaneously to workloads submitted through Vulkan.

External compute queues are represented by `VkExternalComputeQueueNV`
handles:

// Provided by VK_NV_external_compute_queue
VK_DEFINE_HANDLE(VkExternalComputeQueueNV)

To create an external compute queue for use by compatible external APIs
call:

// Provided by VK_NV_external_compute_queue
VkResult vkCreateExternalComputeQueueNV(
    VkDevice                                    device,
    const VkExternalComputeQueueCreateInfoNV*   pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkExternalComputeQueueNV*                   pExternalQueue);

* 
`device` is the VkDevice that the external queue will be a part of.

* 
`pCreateInfo` is a pointer to a
[VkExternalComputeQueueCreateInfoNV](#VkExternalComputeQueueCreateInfoNV) structure specifying
configuration info for creating the external queue.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

* 
`pExternalQueue` is a pointer to a [VkExternalComputeQueueNV](#VkExternalComputeQueueNV)
object that will be filled with the handle for the created external
queue.

Valid Usage (Implicit)

* 
[](#VUID-vkCreateExternalComputeQueueNV-device-parameter) VUID-vkCreateExternalComputeQueueNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateExternalComputeQueueNV-pCreateInfo-parameter) VUID-vkCreateExternalComputeQueueNV-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkExternalComputeQueueCreateInfoNV](#VkExternalComputeQueueCreateInfoNV) structure

* 
[](#VUID-vkCreateExternalComputeQueueNV-pAllocator-parameter) VUID-vkCreateExternalComputeQueueNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateExternalComputeQueueNV-pExternalQueue-parameter) VUID-vkCreateExternalComputeQueueNV-pExternalQueue-parameter

 `pExternalQueue` **must** be a valid pointer to a [VkExternalComputeQueueNV](#VkExternalComputeQueueNV) handle

* 
[](#VUID-vkCreateExternalComputeQueueNV-device-queuecount) VUID-vkCreateExternalComputeQueueNV-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](../fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](../fundamentals.html#VkResult)

[Failure](../fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](../fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](../fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](../fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](../fundamentals.html#VkResult)

To destroy a previously created external compute queue call:

// Provided by VK_NV_external_compute_queue
void vkDestroyExternalComputeQueueNV(
    VkDevice                                    device,
    VkExternalComputeQueueNV                    externalQueue,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the external queue.

* 
`externalQueue` is the [VkExternalComputeQueueNV](#VkExternalComputeQueueNV) to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../memory.html#memory-allocation) chapter.

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyExternalComputeQueueNV-device-parameter) VUID-vkDestroyExternalComputeQueueNV-device-parameter

 `device` **must** be a valid [VkDevice](../devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyExternalComputeQueueNV-externalQueue-parameter) VUID-vkDestroyExternalComputeQueueNV-externalQueue-parameter

 `externalQueue` **must** be a valid [VkExternalComputeQueueNV](#VkExternalComputeQueueNV) handle

* 
[](#VUID-vkDestroyExternalComputeQueueNV-pAllocator-parameter) VUID-vkDestroyExternalComputeQueueNV-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](../memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyExternalComputeQueueNV-externalQueue-parent) VUID-vkDestroyExternalComputeQueueNV-externalQueue-parent

 `externalQueue` **must** have been created, allocated, or retrieved from `device`

To query the implementation-specific data that must be passed to compatible
external APIs during their initialization process call:

// Provided by VK_NV_external_compute_queue
void vkGetExternalComputeQueueDataNV(
    VkExternalComputeQueueNV                    externalQueue,
    VkExternalComputeQueueDataParamsNV*         params,
    void*                                       pData);

* 
`externalQueue` is the [VkExternalComputeQueueNV](#VkExternalComputeQueueNV) to query the
data for.

* 
`params` is a pointer to a [VkExternalComputeQueueDataParamsNV](#VkExternalComputeQueueDataParamsNV)
structure specifying parameters required for retrieval of the
implementation-specific data.

* 
`pData` is a pointer to application-allocated memory in which the
requested data will be returned.

Valid Usage

* 
[](#VUID-vkGetExternalComputeQueueDataNV-pData-08134) VUID-vkGetExternalComputeQueueDataNV-pData-08134

`pData` **must** be at least the size specified by the externalDataSize
field in the [VkPhysicalDeviceExternalComputeQueuePropertiesNV](#VkPhysicalDeviceExternalComputeQueuePropertiesNV)
structure

Valid Usage (Implicit)

* 
[](#VUID-vkGetExternalComputeQueueDataNV-externalQueue-parameter) VUID-vkGetExternalComputeQueueDataNV-externalQueue-parameter

 `externalQueue` **must** be a valid [VkExternalComputeQueueNV](#VkExternalComputeQueueNV) handle

* 
[](#VUID-vkGetExternalComputeQueueDataNV-params-parameter) VUID-vkGetExternalComputeQueueDataNV-params-parameter

 `params` **must** be a valid pointer to a [VkExternalComputeQueueDataParamsNV](#VkExternalComputeQueueDataParamsNV) structure

* 
[](#VUID-vkGetExternalComputeQueueDataNV-pData-parameter) VUID-vkGetExternalComputeQueueDataNV-pData-parameter

 `pData` **must** be a pointer value

The `VkExternalComputeQueueDeviceCreateInfoNV` structure is defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkExternalComputeQueueDeviceCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           reservedExternalQueues;
} VkExternalComputeQueueDeviceCreateInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`reservedExternalQueues` is the maximum number of external queues an
application **can** create at once.
This **must** be less than or equal to the `maxExternalQueues` value
reported by [VkPhysicalDeviceExternalComputeQueuePropertiesNV](#VkPhysicalDeviceExternalComputeQueuePropertiesNV)

Valid Usage (Implicit)

* 
[](#VUID-VkExternalComputeQueueDeviceCreateInfoNV-sType-sType) VUID-VkExternalComputeQueueDeviceCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DEVICE_CREATE_INFO_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](../devsandqueues.html#VkDeviceCreateInfo)

The `VkExternalComputeQueueCreateInfoNV` structure is defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkExternalComputeQueueCreateInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    VkQueue            preferredQueue;
} VkExternalComputeQueueCreateInfoNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`preferredQueue` is a `VkQueue` supporting graphics commands.

When creating a `VkExternalComputeQueueNV`, the `preferredQueue`
field is a strong scheduling hint as to which `VkQueue` Vulkan graphics
workloads will be submitted to with the expectation that execution will
overlap with execution of work submitted by the external API.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalComputeQueueCreateInfoNV-sType-sType) VUID-VkExternalComputeQueueCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_CREATE_INFO_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalComputeQueueCreateInfoNV-pNext-pNext) VUID-VkExternalComputeQueueCreateInfoNV-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkExternalComputeQueueCreateInfoNV-preferredQueue-parameter) VUID-VkExternalComputeQueueCreateInfoNV-preferredQueue-parameter

 `preferredQueue` **must** be a valid [VkQueue](../devsandqueues.html#VkQueue) handle

The `VkExternalComputeQueueDataParamsNV` structure is defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkExternalComputeQueueDataParamsNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           deviceIndex;
} VkExternalComputeQueueDataParamsNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`deviceIndex` is the index of the device within a device group that
the data is being queried for.
This is ignored if device groups are not utilized.

Valid Usage (Implicit)

* 
[](#VUID-VkExternalComputeQueueDataParamsNV-sType-sType) VUID-VkExternalComputeQueueDataParamsNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXTERNAL_COMPUTE_QUEUE_DATA_PARAMS_NV](../fundamentals.html#VkStructureType)

* 
[](#VUID-VkExternalComputeQueueDataParamsNV-pNext-pNext) VUID-VkExternalComputeQueueDataParamsNV-pNext-pNext

 `pNext` **must** be `NULL`

The `VkPhysicalDeviceExternalComputeQueuePropertiesNV` structure is
defined as:

// Provided by VK_NV_external_compute_queue
typedef struct VkPhysicalDeviceExternalComputeQueuePropertiesNV {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           externalDataSize;
    uint32_t           maxExternalQueues;
} VkPhysicalDeviceExternalComputeQueuePropertiesNV;

* 
`sType` is a [VkStructureType](../fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`externalDataSize` is the minimum size of the memory allocation that
applications **can** pass to [vkGetExternalComputeQueueDataNV](#vkGetExternalComputeQueueDataNV).

* 
`maxExternalQueues` is the maximum number of external queues that an
application can create.

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalComputeQueuePropertiesNV-sType-sType) VUID-VkPhysicalDeviceExternalComputeQueuePropertiesNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_COMPUTE_QUEUE_PROPERTIES_NV](../fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structure](../fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceProperties2](../devsandqueues.html#VkPhysicalDeviceProperties2)
