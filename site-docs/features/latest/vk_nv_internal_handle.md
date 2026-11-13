# VK_NV_internal_handle

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_NV_internal_handle.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Changes](#_api_changes)
- [3.1._API_Changes](#_api_changes)
- [3.1.1. Exporting Internal Handles](#_exporting_internal_handles)
- [3.1.1._Exporting_Internal_Handles](#_exporting_internal_handles)
- [3.1.2. Handle Lifetime and Validity](#_handle_lifetime_and_validity)
- [3.1.2._Handle_Lifetime_and_Validity](#_handle_lifetime_and_validity)
- [3.1.3. Object State](#_object_state)
- [3.1.3._Object_State](#_object_state)
- [3.1.4. Creation Requirements](#_creation_requirements)
- [3.1.4._Creation_Requirements](#_creation_requirements)
- [4. Issues](#_issues)
- [4.1. Can an object be queried for the internal handle multiple times?](#_can_an_object_be_queried_for_the_internal_handle_multiple_times)
- [4.1._Can_an_object_be_queried_for_the_internal_handle_multiple_times?](#_can_an_object_be_queried_for_the_internal_handle_multiple_times)
- [4.2. Does querying an object affect its state or usability from Vulkan?](#_does_querying_an_object_affect_its_state_or_usability_from_vulkan)
- [4.2._Does_querying_an_object_affect_its_state_or_usability_from_Vulkan?](#_does_querying_an_object_affect_its_state_or_usability_from_vulkan)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Changes](#_api_changes)

[4. Issues](#_issues)

[4.1. Can an object be queried for the internal handle multiple times?](#_can_an_object_be_queried_for_the_internal_handle_multiple_times)
[4.2. Does querying an object affect its state or usability from Vulkan?](#_does_querying_an_object_affect_its_state_or_usability_from_vulkan)

NVIDIA provides various APIs and tools (such as compute frameworks, debugging tools, and profiling utilities) that benefit from integration with Vulkan objects. However, the specific operations these tools need to perform are often highly implementation-specific, subject to rapid evolution, or represent internal optimizations that are not suitable for formal standardization.

Exposing each capability through formal Vulkan extensions would lead to API surface bloat, create long-term maintenance burdens for functionality that may be experimental or subject to frequent change, and require external specification of implementation details that are better kept internal.

This extension proposes a lightweight mechanism to get opaque handles to Vulkan objects. The Vulkan handles themselves (such as `VkCommandBuffer`, `VkDevice`, etc.) are not suitable for this purpose, since the handle the application receives may have been wrapped by an intermediate layer (such as a validation or tracing layer) rather than being the driver’s own handle. By providing distinct, opaque handles that an interceptor must not wrap, this mechanism ensures vendor-specific tools and external APIs receive the implementation’s internal object handles rather than a layer-wrapped pointer, without requiring formal API surface for each use case.

There are a couple approaches that could be taken to solve this problem:

* 
Expose formal Vulkan extensions for each specific capability needed by external APIs and tools - this approach would require standardizing implementation details, create API bloat, and slow down iteration for experimental features

* 
Provide an opaque handle mechanism that gives external APIs and tools access to driver objects without formally specifying capabilities

This extension takes the second approach, providing simple functions that return opaque handles. The specific capabilities available through these handles are deliberately left as implementation details, allowing:

* 
Rapid iteration and experimentation with new capabilities without specification overhead

* 
Vendor-specific optimizations that do not need cross-vendor standardization

* 
Internal tool integration without exposing implementation details

* 
Flexibility to evolve capabilities over time without API versioning concerns

* 
Minimal API surface while enabling vendor-specific functionality through private interfaces

This extension provides four new entry points for exporting internal handles from different Vulkan object types:

VKAPI_ATTR void VKAPI_CALL vkGetPhysicalDeviceInternalHandleNV(
    VkPhysicalDevice        physicalDevice,
    VkInternalHandleNV*     pHandle
)

VKAPI_ATTR void VKAPI_CALL vkGetDeviceInternalHandleNV(
    VkDevice                device,
    VkInternalHandleNV*     pHandle
)

VKAPI_ATTR void VKAPI_CALL vkGetQueueInternalHandleNV(
    VkQueue                 queue,
    VkInternalHandleNV*     pHandle
)

VKAPI_ATTR void VKAPI_CALL vkGetCommandBufferInternalHandleNV(
    VkCommandBuffer         commandBuffer,
    VkInternalHandleNV*     pHandle
)

The extension defines a single opaque handle type:

typedef struct VkInternalObjectNV* VkInternalHandleNV;

For each function:

* 
The first parameter is the Vulkan object to query

* 
`pHandle` is a pointer to an opaque handle in which the internal handle will be returned

The returned handles are opaque pointers. This extension defines no Vulkan interface that consumes them. Applications must not dereference them, and must only pass them to external APIs that accept them. The operations those external APIs perform are outside the Vulkan specification. Layers may intercept these commands, but an interceptor must not return a wrapped handle to the application. The returned value is the implementation’s internal handle.

Each returned internal handle remains valid for the lifetime of its corresponding Vulkan object:

* 
Physical device handles are valid until the instance is destroyed

* 
Device handles are valid until `vkDestroyDevice` is called

* 
Queue handles are valid until the device is destroyed

* 
Command buffer handles are valid until the command buffer is freed (either explicitly via `vkFreeCommandBuffers` or implicitly when its command pool is destroyed)

The returned handles act as references to the underlying driver objects. All synchronization requirements that apply to the original Vulkan handles also apply to the returned internal handles. Specifically:

* 
Objects must not be accessed by both the Vulkan API and an external API simultaneously without external synchronization

Object handles can be queried for at any time:

* 
Physical devices can be queried after instance creation

* 
Devices can be queried after device creation

* 
Queues can be queried after being retrieved from a device

* 
Command buffers can be queried at any time, regardless of their state (initial, recording, executable, or pending)

No special flags or creation requirements are needed to get internal handles:

* 
No special instance, device, or command pool creation flags are required

* 
Any object of the supported types can be queried

Yes. An application can query an object multiple times, and each call will return the same valid handle.

No. Querying an object for the internal handle has no effect on the object itself. The object can continue to be used normally through all Vulkan API entry points.
