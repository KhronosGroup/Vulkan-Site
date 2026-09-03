# GL_EXT_subgroupuniform_qualifier

## Metadata

- **Component**: glslext
- **Version**: latest
- **URL**: /glslext/latest/glslext/ext/GL_EXT_subgroupuniform_qualifier.html

## Content

The original text file describing this extension as a set of diffs to the
OpenGL Shading Language Specification follows.

Name

    EXT_subgroupuniform_qualifier

Name Strings

    GL_EXT_subgroupuniform_qualifier

Contact

    Neil Henning (neil.henning 'at' amd.com)

Contributors

    Jeff Bolz, NVIDIA Corporation
    John Kessenich, Google
    Nicolai Hähnle, AMD

Status

    Draft

Version

    Last Modified Date:         September 19, 2018
    Revision:                   1

Number

    TBD

Dependencies

    This extension requires GL_KHR_vulkan_glsl

Overview

    This extension adds a "subgroupuniformEXT" type qualifier and constructor,
    such that for each dynamic instance of an object qualified by a subgroup
    uniform type or constructed with a subgroup uniform constructor, all active
    invocations in a subgroup compute the same result value.

New Procedures and Functions

    None.

New Tokens

    None.

Modifications to GL_KHR_vulkan_glsl

    Add to the "Mapping to SPIR-V" section

    Mapping of subgroupuniformEXT type qualifier:

      subgroupuniformEXT -> Uniform decoration on variables

Modifications to the OpenGL Shading Language Specification, Version 4.50

    Including the following line in a shader can be used to control the
    language features described in this extension:

        #extension GL_EXT_subgroupuniform_qualifier : 

    where  is as specified in section 3.3

    New preprocessor #defines are added to the OpenGL Shading Language:

        #define GL_EXT_subgroupuniform_qualifier     1

    Add to section 3.6 Keywords:

        subgroupuniformEXT

    Add a new section:

      "4.X subgroupuniformEXT qualifier"

      The subgroupuniformEXT qualifier can be used to assert that for a dynamic
      instance of a variable or expression all active invocations in a subgroup
      compute the same result value. In a declaration, it is syntactically
      treated as a qualifier. It can be applied to:

        * variable declarations qualified as *in*
        * global variable declarations with no storage qualifier
        * local variable declarations with no storage qualifier
        * function parameter declarations and function return types.

      Any other use on a declaration results in a compile-time error.

      The subgroupuniformEXT qualifier can also be used with constructor syntax
      to assert that for a dynamic instance of an expression all active
      invocations in a subgroup compute the same result value. For example:

          if (subgroupuniformEXT(a
