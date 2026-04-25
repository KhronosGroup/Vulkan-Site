# vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM - Query the data processing engines and the operations they support for a given queue family of a physical device

To query the data graph processing engines and operations they support for a
specific queue family of a physical device, call:

// Provided by VK_ARM_data_graph
VkResult vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    uint32_t*                                   pQueueFamilyDataGraphPropertyCount,
    VkQueueFamilyDataGraphPropertiesARM*        pQueueFamilyDataGraphProperties);

* 
`physicalDevice` is the physical device to query.

* 
`queueFamilyIndex` is the index of the queue family being queried.

* 
`pQueueFamilyDataGraphPropertyCount` is a pointer to an integer
related to the number of properties available or queried.

* 
`pQueueFamilyDataGraphProperties` is either `NULL` or a pointer to
an array of [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html) structures.

If `pQueueFamilyDataGraphProperties` is `NULL`, then the number of
properties available is returned in
`pQueueFamilyDataGraphPropertyCount`.
Otherwise, `pQueueFamilyDataGraphPropertyCount` **must** point to a
variable set by the application to the number of elements in the
`pQueueFamilyDataGraphProperties` array, and on return the variable is
overwritten with the number of structures actually written to
`pQueueFamilyDataGraphProperties`.
If `pQueueFamilyDataGraphPropertyCount` is less than the number of
properties available, at most `pQueueFamilyDataGraphPropertyCount`
structures will be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead
of [VK_SUCCESS](VkResult.html), to indicate that not all the available properties were
returned.

If the [dataGraphModel](../../../../spec/latest/chapters/features.html#features-dataGraphModelQCOM) feature is supported,
the implementation **must** return at least one property with engine type
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html) or
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphPropertyCount-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphPropertyCount-parameter

 `pQueueFamilyDataGraphPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphProperties-parameter) VUID-vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM-pQueueFamilyDataGraphProperties-parameter

 If the value referenced by `pQueueFamilyDataGraphPropertyCount` is not `0`, and `pQueueFamilyDataGraphProperties` is not `NULL`, `pQueueFamilyDataGraphProperties` **must** be a valid pointer to an array of `pQueueFamilyDataGraphPropertyCount` [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

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

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
