# VK_NV_external_compute_queue

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_NV_external_compute_queue.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Changes](#_api_changes)
- [3.1._API_Changes](#_api_changes)
- [3.1.1. VkExternalComputeQueueNV](#_vkexternalcomputequeuenv)
- [Creating and Destroying External Compute Queues](#_creating_and_destroying_external_compute_queues)
- [Creating_and_Destroying_External_Compute_Queues](#_creating_and_destroying_external_compute_queues)
- [Using External Compute Queues](#_using_external_compute_queues)
- [Using_External_Compute_Queues](#_using_external_compute_queues)
- [3.1.2. Properties](#_properties)
- [4. Issues](#_issues)
- [4.1. How does execution of work on an external compute queue interact with vkDeviceWaitIdle?](#_how_does_execution_of_work_on_an_external_compute_queue_interact_with_vkdevicewaitidle)
- [4.1._How_does_execution_of_work_on_an_external_compute_queue_interact_with_vkDeviceWaitIdle?](#_how_does_execution_of_work_on_an_external_compute_queue_interact_with_vkdevicewaitidle)
- [4.2. Does this extension allow for more direct sharing of resources between Vulkan and the external compute API?](#_does_this_extension_allow_for_more_direct_sharing_of_resources_between_vulkan_and_the_external_compute_api)
- [4.2._Does_this_extension_allow_for_more_direct_sharing_of_resources_between_Vulkan_and_the_external_compute_API?](#_does_this_extension_allow_for_more_direct_sharing_of_resources_between_vulkan_and_the_external_compute_api)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Changes](#_api_changes)

[4. Issues](#_issues)

[4.1. How does execution of work on an external compute queue interact with `vkDeviceWaitIdle`?](#_how_does_execution_of_work_on_an_external_compute_queue_interact_with_vkdevicewaitidle)
[4.2. Does this extension allow for more direct sharing of resources between Vulkan and the external compute API?](#_does_this_extension_allow_for_more_direct_sharing_of_resources_between_vulkan_and_the_external_compute_api)

Vulkan applications launching compute workloads through external APIs are presently limited by the fact that execution of these workloads is performed within a separate execution context on the GPU. This limits the ability of applications to achieve maximum performance when executing these externally launched compute workloads as these external compute workloads will not be able to execute simultaneously to the workloads launched through the Vulkan API.

This extension proposes a mechanism through which an application may join an external compute API to a Vulkan device in order for the application to execute these external compute workloads within the same context as Vulkan workloads.

There are two main approaches we could take to solve the underlying problem:

* 
Join the Vulkan device and queues to the context created by the external compute API

* 
Join the external compute API to the execution context represented by the Vulkan device and queues

In this extension we take the latter approach, with the introduction of new Vulkan API object representing external queues which an application can create. These external queues hold information and reserve resources necessary for the external API to join the Vulkan device.

In order to create and destroy external compute queues an application first must start by passing an additional structure to the `vkCreateDevice` function through the `VkDeviceCreateInfo` pNext chain:

typedef struct VkExternalComputeQueueDeviceCreateInfoNV {
    VkStructureType     sType;
    void *              pNext;
    uint32_t            reservedExternalQueues;
} VkExternalComputeQueueDeviceCreateInfoNV;

Here, the application must use the `reservedExternalQueues` field to communicate the maximum number of simultaneous external compute queues it may create. While external compute queues may be created and destroyed dynamically, having the application communicate this limit at device creation time may allow the implementation to make better resource allocation decisions during device initialization.

Once a Vulkan device has been created, external compute queues can be created through a new API entry point:

VKAPI_ATTR VkResult VKAPI_CALL vkCreateExternalComputeQueueNV(
    VkDevice                                    device,
    const VkExternalComputeQueueCreateInfoNV *  pCreateInfo,
    const VkAllocationCallbacks *               pAllocator,
    VkExternalComputeQueueNV *                  pExternalQueue
)

Where the `VkExternalComputeQueueCreateInfoNV` structure is defined as follows:

typedef struct VkExternalComputeQueueCreateInfoNV {
    VkStructureType     sType;
    void *              pNext;
    VkQueue             preferredQueue;
} VkExternalComputeQueueCreateInfoNV;

When creating a `VkExternalComputeQueueNV`, the `preferredQueue` field in the `VkExternalComputeQueueCreateInfoNV` structure is a strong scheduling hint as to which Vulkan queue graphics workloads will be submitted to with the expectation that execution will overlap with execution of work submitted through the external API.

Once created, the `VkExternalComputeQueueNV` holds on to information and resources necessary for an external compute API to be able to execute within the same context as Vulkan workloads. In order to destroy the external queue and release these resources, an application must call:

VKAPI_ATTR VkResult VKAPI_CALL vkDestroyExternalComputeQueueNV(
    VkDevice                        device,
    VkExternalComputeQueueNV        externalQueue,
    const VkAllocationCallbacks *   pAllocator
)

In order to utilize a `VkExternalComputeQueueNV` with a compatible external compute API, an application must query for an opaque blob of information using the `vkGetExternalComputeQueueDataNV` entry point:

VKAPI_ATTR VkResult VKAPI_CALL vkGetExternalComputeQueueDataNV(
    VkExternalComputeQueueNV                externalQueue,
    VkExternalComputeQueueDataParamsNV *    params,
    void *                                  pData
)

The `VkExternalComputeQueueDataParamsNV` structure is defined as follows:

typedef struct VkExternalComputeQueueDataParamsNV {
    VkStructureType     sType;
    void *              pNext;
    uint32_t            deviceIndex;
} VkExternalComputeQueueDataParamsNV;

Where `deviceIndex` is the index of the device within the device group for which data is being queried.

The information needed by the external compute API is stored by `vkGetExternalComputeQueueDataNV` in the `pData` argument, which is a pointer to an application managed memory allocation. The required size for this allocation can be queried through a new `VkPhysicalDeviceProperties` structure: `VkPhysicalDeviceExternalComputeQueuePropertiesNV`.

typedef struct VkPhysicalDeviceExternalComputeQueuePropertiesNV {
    VkStructureType     sType;
    void *              pNext;
    uint32_t            externalDataSize;
    uint32_t            maxExternalQueues;
} VkPhysicalDeviceExternalComputeQueuePropertiesNV;

This structure defines two properties of interest for working with this extension:

* 
`externalDataSize` - this field indicates the size of the memory allocation that is expected to be passed to the `vkGetExternalComputeQueueDataNV` function.

* 
`maxExternalQueues` - this field indicates the maximum number of external compute queues which can be created through this extension on a single Vulkan device.

`vkDeviceWaitIdle` does not wait for external compute queues. Draining work on an external compute queue must be done through its own external API.

No. This extension does not propose any changes or additions to existing resource sharing and cross-API synchronization mechanisms.
