# VkPhysicalDeviceShaderQuadControlFeaturesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderQuadControlFeaturesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderQuadControlFeaturesKHR - Structure describing whether quad scopes are supported by the implementation

The `VkPhysicalDeviceShaderQuadControlFeaturesKHR` structure is defined
as:

// Provided by VK_KHR_shader_quad_control
typedef struct VkPhysicalDeviceShaderQuadControlFeaturesKHR {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderQuadControl;
} VkPhysicalDeviceShaderQuadControlFeaturesKHR;

This structure describes the following features:

* 
 `shaderQuadControl` indicates whether
the implementation supports shaders with the `QuadControlKHR`
capability.

If the `VkPhysicalDeviceShaderQuadControlFeaturesKHR` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderQuadControlFeaturesKHR`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderQuadControlFeaturesKHR-sType-sType) VUID-VkPhysicalDeviceShaderQuadControlFeaturesKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_QUAD_CONTROL_FEATURES_KHR](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_KHR_shader_quad_control](VK_KHR_shader_quad_control.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderQuadControlFeaturesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
