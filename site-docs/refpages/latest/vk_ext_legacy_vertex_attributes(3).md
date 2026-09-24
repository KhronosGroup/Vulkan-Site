# VK_EXT_legacy_vertex_attributes(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_legacy_vertex_attributes.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_legacy_vertex_attributes](#VK_EXT_legacy_vertex_attributes)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_legacy_vertex_attributes - device extension

**Name String**

`VK_EXT_legacy_vertex_attributes`

**Extension Type**

Device extension

**Registered Extension Number**

496

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_vertex_input_dynamic_state](VK_EXT_vertex_input_dynamic_state.html)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_legacy_vertex_attributes] @zmike%0A*Here describe the issue or question you have about the VK_EXT_legacy_vertex_attributes extension*)

**Extension Proposal**

[VK_EXT_legacy_vertex_attributes](../../../../features/latest/features/proposals/VK_EXT_legacy_vertex_attributes.html)

**Last Modified Date**

2024-02-23

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Piers Daniell, NVIDIA

* 
Spencer Fricke, LunarG

* 
Alyssa Rosenzweig, Valve

This extension adds support for legacy features of (non-64-bit) vertex
attributes as found in OpenGL:

* 
Vertex attributes loaded from arbitrary buffer alignments

* 
Vertex attributes using arbitrary strides

* 
Vertex attributes where the component data type of the binding does not
match the component numeric type of the shader input

These features are only usable with dynamic vertex input.
Unaligned loads of vertex attributes may incur performance penalties,
indicated with a property.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT](VkPhysicalDeviceLegacyVertexAttributesFeaturesEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT](VkPhysicalDeviceLegacyVertexAttributesPropertiesEXT.html)

* 
`VK_EXT_LEGACY_VERTEX_ATTRIBUTES_EXTENSION_NAME`

* 
`VK_EXT_LEGACY_VERTEX_ATTRIBUTES_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_VERTEX_ATTRIBUTES_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LEGACY_VERTEX_ATTRIBUTES_PROPERTIES_EXT](VkStructureType.html)

1.) Should implementations convert float/integer values?

**RESOLVED**: No.
When fetching an integer data type from float values or float data types
from integer values, the resulting shader values are
implementation-dependent.

* 
Revision 1, 2024-02-16 (Mike Blumenkrantz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_legacy_vertex_attributes).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
