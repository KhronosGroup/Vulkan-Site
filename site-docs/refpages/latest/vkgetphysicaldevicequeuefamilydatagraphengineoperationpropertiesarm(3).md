# vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM - Query the properties of a data graph processing engine and operation set combination for a specific queue family of a physical device

To query the properties of a data graph processing engine and operation set
combination for a specific queue family of a physical device, call:

// Provided by VK_ARM_data_graph_instruction_set_tosa, VK_ARM_data_graph_optical_flow
VkResult vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    const VkQueueFamilyDataGraphPropertiesARM*  pQueueFamilyDataGraphProperties,
    VkBaseOutStructure*                         pProperties);

* 
`physicalDevice` is the physical device to query.

* 
`queueFamilyIndex` is the index of the queue family being queried.

* 
`pQueueFamilyDataGraphProperties` is a pointer to a
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html) structure that selects the
processing engine and operation set for which the properties are
queried.

* 
`pProperties` is a pointer to a structure in which the properties
are returned.

Valid property queries for specific engines and operations
| Engine | Operation Type | Operation Name | Operation Version | Property structure |
| --- | --- | --- | --- | --- |
| Any | Any | `TOSA.XXXXXX.X` where `X` is a digit between 0 and 9 | Any | [VkQueueFamilyDataGraphTOSAPropertiesARM](VkQueueFamilyDataGraphTOSAPropertiesARM.html) |
| Any | Any | `OpticalFlow` | Any | [VkQueueFamilyDataGraphOpticalFlowPropertiesARM](VkQueueFamilyDataGraphOpticalFlowPropertiesARM.html) |

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-pQueueFamilyDataGraphProperties-09957) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-pQueueFamilyDataGraphProperties-09957

The [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html) structure pointed to by
`pQueueFamilyDataGraphProperties` **must** have been obtained by a
prior call to [vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html)
with the same `physicalDevice` and `queueFamilyIndex`

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-pProperties-09958) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-pProperties-09958

`pProperties` **must** be a valid structure of the appropriate type as
defined in [graphs-valid-engine-operation-queries](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-valid-engine-operation-queries)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-pQueueFamilyDataGraphProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM-pQueueFamilyDataGraphProperties-parameter

 `pQueueFamilyDataGraphProperties` **must** be a valid pointer to a valid [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_ARM_data_graph_instruction_set_tosa](VK_ARM_data_graph_instruction_set_tosa.html), [VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkBaseOutStructure](VkBaseOutStructure.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
