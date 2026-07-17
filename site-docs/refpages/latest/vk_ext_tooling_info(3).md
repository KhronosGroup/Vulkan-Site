# VK_EXT_tooling_info(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_tooling_info.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_tooling_info](#VK_EXT_tooling_info)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.3](#_promotion_to_vulkan_1_3)
- [Promotion_to_Vulkan_1.3](#_promotion_to_vulkan_1_3)
- [Examples](#_examples)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_tooling_info - device extension

**Name String**

`VK_EXT_tooling_info`

**Extension Type**

Device extension

**Registered Extension Number**

246

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**API Interactions**

* 
Interacts with VK_EXT_debug_marker

* 
Interacts with VK_EXT_debug_report

* 
Interacts with VK_EXT_debug_utils

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3-promotions)

**Contact**

* 
Tobias Hector [tobski](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_tooling_info] @tobski%0A*Here describe the issue or question you have about the VK_EXT_tooling_info extension*)

**Last Modified Date**

2018-11-05

**Contributors**

* 
Rolando Caloca

* 
Matthaeus Chajdas

* 
Baldur Karlsson

* 
Daniel Rakos

When an error occurs during application development, a common question is
"What tools are actually running right now?" This extension adds the ability
to query that information directly from the Vulkan implementation.

Outdated versions of one tool might not play nicely with another, or perhaps
a tool is not actually running when it should have been.
Trying to figure that out can cause headaches as it is necessary to consult
each known tool to figure out what is going on — in some cases the tool
might not even be known.

Typically, the expectation is that developers will simply print out this
information for visual inspection when an issue occurs, however a small
amount of semantic information about what the tool is doing is provided to
help identify it programmatically.
For example, if the advertised limits or features of an implementation are
unexpected, is there a tool active which modifies these limits? Or if an
application is providing debug markers, but the implementation is not
actually doing anything with that information, this can quickly point that
out.

* 
[vkGetPhysicalDeviceToolPropertiesEXT](vkGetPhysicalDeviceToolProperties.html)

* 
[VkPhysicalDeviceToolPropertiesEXT](VkPhysicalDeviceToolProperties.html)

* 
[VkToolPurposeFlagBitsEXT](VkToolPurposeFlagBits.html)

* 
[VkToolPurposeFlagsEXT](VkToolPurposeFlags.html)

* 
`VK_EXT_TOOLING_INFO_EXTENSION_NAME`

* 
`VK_EXT_TOOLING_INFO_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_TOOL_PROPERTIES_EXT](VkStructureType.html)

Extending [VkToolPurposeFlagBits](VkToolPurposeFlagBits.html):

* 
[VK_TOOL_PURPOSE_ADDITIONAL_FEATURES_BIT_EXT](VkToolPurposeFlagBits.html)

* 
[VK_TOOL_PURPOSE_MODIFYING_FEATURES_BIT_EXT](VkToolPurposeFlagBits.html)

* 
[VK_TOOL_PURPOSE_PROFILING_BIT_EXT](VkToolPurposeFlagBits.html)

* 
[VK_TOOL_PURPOSE_TRACING_BIT_EXT](VkToolPurposeFlagBits.html)

* 
[VK_TOOL_PURPOSE_VALIDATION_BIT_EXT](VkToolPurposeFlagBits.html)

If [VK_EXT_debug_marker](VK_EXT_debug_marker.html) is supported:

* 
Extending [VkToolPurposeFlagBits](VkToolPurposeFlagBits.html):

[VK_TOOL_PURPOSE_DEBUG_MARKERS_BIT_EXT](VkToolPurposeFlagBits.html)

If [VK_EXT_debug_report](VK_EXT_debug_report.html) is supported:

* 
Extending [VkToolPurposeFlagBits](VkToolPurposeFlagBits.html):

[VK_TOOL_PURPOSE_DEBUG_REPORTING_BIT_EXT](VkToolPurposeFlagBits.html)

If [VK_EXT_debug_utils](VK_EXT_debug_utils.html) is supported:

* 
Extending [VkToolPurposeFlagBits](VkToolPurposeFlagBits.html):

[VK_TOOL_PURPOSE_DEBUG_MARKERS_BIT_EXT](VkToolPurposeFlagBits.html)

* 
[VK_TOOL_PURPOSE_DEBUG_REPORTING_BIT_EXT](VkToolPurposeFlagBits.html)

Vulkan APIs in this extension are included in core Vulkan 1.3, with the EXT
suffix omitted.
External interactions defined by this extension, such as SPIR-V token names,
retain their original names.
The original Vulkan API names are still available as aliases of the core
functionality.

Printing Tool Information

uint32_t num_tools;
VkPhysicalDeviceToolPropertiesEXT *pToolProperties;
vkGetPhysicalDeviceToolPropertiesEXT(physicalDevice, &num_tools, NULL);

pToolProperties = (VkPhysicalDeviceToolPropertiesEXT*)malloc(sizeof(VkPhysicalDeviceToolPropertiesEXT) * num_tools);

vkGetPhysicalDeviceToolPropertiesEXT(physicalDevice, &num_tools, pToolProperties);

for (int i = 0; i  0) {
        printf("Corresponding Layer:\n");
        printf("\t%s\n", pToolProperties[i].layer);
    }
}

1) Why is this information separate from the layer mechanism?

Some tooling may be built into a driver, or be part of the Vulkan loader
etc.
Tying this information directly to layers would have been awkward at best.

* 
Revision 1, 2018-11-05 (Tobias Hector)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_tooling_info).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
