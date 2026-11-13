# VK_EXT_vertex_attribute_divisor(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_vertex_attribute_divisor.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_vertex_attribute_divisor](#VK_EXT_vertex_attribute_divisor)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_vertex_attribute_divisor - device extension

**Name String**

`VK_EXT_vertex_attribute_divisor`

**Extension Type**

Device extension

**Registered Extension Number**

191

**Revision**

3

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_vertex_attribute_divisor](VK_KHR_vertex_attribute_divisor.html)
extension

Which in turn was *promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Vikram Kushwaha [vkushwaha](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_vertex_attribute_divisor] @vkushwaha%0A*Here describe the issue or question you have about the VK_EXT_vertex_attribute_divisor extension*)

**Last Modified Date**

2018-08-03

**IP Status**

No known IP claims.

**Contributors**

* 
Vikram Kushwaha, NVIDIA

* 
Faith Ekstrand, Intel

This extension allows instance-rate vertex attributes to be repeated for
certain number of instances instead of advancing for every instance when
instanced rendering is enabled.

* 
[VkVertexInputBindingDivisorDescriptionEXT](VkVertexInputBindingDivisorDescription.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceVertexAttributeDivisorFeaturesEXT](VkPhysicalDeviceVertexAttributeDivisorFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT](VkPhysicalDeviceVertexAttributeDivisorPropertiesEXT.html)

Extending [VkPipelineVertexInputStateCreateInfo](VkPipelineVertexInputStateCreateInfo.html):

* 
[VkPipelineVertexInputDivisorStateCreateInfoEXT](VkPipelineVertexInputDivisorStateCreateInfo.html)

* 
`VK_EXT_VERTEX_ATTRIBUTE_DIVISOR_EXTENSION_NAME`

* 
`VK_EXT_VERTEX_ATTRIBUTE_DIVISOR_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VERTEX_ATTRIBUTE_DIVISOR_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO_EXT](VkStructureType.html)

1) What is the effect of a non-zero value for `firstInstance`?

**RESOLVED**: The Vulkan API should follow the OpenGL convention and offset
attribute fetching by `firstInstance` while computing vertex attribute
offsets.

2) Should zero be an allowed divisor?

**RESOLVED**: Yes.
A zero divisor means the vertex attribute is repeated for all instances.

To create a vertex binding such that the first binding uses instanced
rendering and the same attribute is used for every 4 draw instances, an
application could use the following set of structures:

    const VkVertexInputBindingDivisorDescriptionEXT divisorDesc =
    {
        .binding = 0,
        .divisor = 4
    };

    const VkPipelineVertexInputDivisorStateCreateInfoEXT divisorInfo =
    {
        .sType = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_DIVISOR_STATE_CREATE_INFO_EXT,
        .pNext = NULL,
        .vertexBindingDivisorCount = 1,
        .pVertexBindingDivisors = &divisorDesc
    }

    const VkVertexInputBindingDescription binding =
    {
        .binding = 0,
        .stride = sizeof(Vertex),
        .inputRate = VK_VERTEX_INPUT_RATE_INSTANCE
    };

    const VkPipelineVertexInputStateCreateInfo viInfo =
    {
        .sType = VK_STRUCTURE_TYPE_PIPELINE_VERTEX_INPUT_CREATE_INFO,
        .pNext = &divisorInfo,
        ...
    };
    //...

* 
Revision 1, 2017-12-04 (Vikram Kushwaha)

First Version

Revision 2, 2018-07-16 (Faith Ekstrand)

* 
Adjust the interaction between `divisor` and `firstInstance` to
match the OpenGL convention.

* 
Disallow divisors of zero.

Revision 3, 2018-08-03 (Vikram Kushwaha)

* 
Allow a zero divisor.

* 
Add a physical device features structure to query/enable this feature.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_vertex_attribute_divisor).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
