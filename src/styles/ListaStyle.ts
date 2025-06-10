import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    color: '#FFF',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    color: '#F35C22',
  },
  searchInput: {
    marginTop: 20,
    padding: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#fff',
  },
  alunoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  deleteCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F35C22',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  deleteIcon: {
    color: '#fff',
  },
  alunoInfoScroll: {
    flex: 1,
  },
  alunoInfoText: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  infoItem: {
    marginRight: 15,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  infoItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  verticalDivider: {
    width: 1,
    height: '70%',
    backgroundColor: '#F35C22',
    marginLeft: 10,
  },
});

export default styles;
