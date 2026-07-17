# VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT - Structure describing OCP microscaling types features that can be supported by the implementation

The `VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT` structure is
defined as:

// Provided by VK_EXT_shader_ocp_microscaling_types
typedef struct VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT {
    VkStructureType    sType;
    void*              pNext;
    VkBool32           shaderFloat4;
    VkBool32           shaderFloat6;
    VkBool32           shaderFloat8UnsignedE8M0;
    VkBool32           shaderMXInt8;
} VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT;

This structure describes the following features:

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
 `shaderFloat4` indicates whether the
implementation supports shaders with the `Float4EXT` or
`BitcastExtractEXT` capabilities.

* 
 `shaderFloat6` indicates whether the
implementation supports shaders with the `Float6EXT` or
`BitcastExtractEXT` capabilities.

* 
 `shaderFloat8UnsignedE8M0`
indicates whether the implementation supports shaders with the
`Float8UnsignedE8M0EXT` capability.

* 
 `shaderMXInt8` indicates whether the
implementation supports shaders with the `MXInt8EXT` capability.

If the `VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT` structure is included in the `pNext` chain of the
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html) structure passed to
[vkGetPhysicalDeviceFeatures2](vkGetPhysicalDeviceFeatures2.html), it is filled in to indicate whether each
corresponding feature is supported.
If the application wishes to use a [VkDevice](VkDevice.html) with any features
described by `VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT`, it **must** add an instance of the structure,
with the desired feature members set to [VK_TRUE](VK_TRUE.html), to the `pNext`
chain of [VkDeviceCreateInfo](VkDeviceCreateInfo.html) when creating the [VkDevice](VkDevice.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT-sType-sType) VUID-VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SHADER_OCP_MICROSCALING_TYPES_FEATURES_EXT](VkStructureType.html)

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDeviceCreateInfo](VkDeviceCreateInfo.html)

* 
[VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html)

[VK_EXT_shader_ocp_microscaling_types](VK_EXT_shader_ocp_microscaling_types.html), `VkBool32`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/features.html#VkPhysicalDeviceShaderOCPMicroscalingTypesFeaturesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
