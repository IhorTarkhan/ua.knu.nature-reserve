package ua.knu.naturereserve.entity;

public interface ManagedByAdmin {
  Long getId();
  String getUsername();
  boolean isEnabled();

  void setUsername(String t);
  void setPassword(String t);
  void setEnabled(boolean t);
}
